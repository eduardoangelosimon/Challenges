class ZenosParadox {
  constructor() {
    this.achilles = document.getElementById("achilles");
    this.tortoise = document.getElementById("tortoise");
    this.stepCounter = document.getElementById("step-counter");
    this.stepInfo = document.getElementById("step-info");
    this.achillesPos = document.getElementById("achilles-pos");
    this.tortoisePos = document.getElementById("tortoise-pos");

    this.achillesPosition = 20;
    this.tortoisePosition = 200;
    this.initialTortoisePosition = 200;

    this.currentStep = 0;
    this.isAnimating = false;
    this.autoMode = false;
    this.autoInterval = null;

    this.achillesSpeed = 10;
    this.tortoiseSpeed = 1;

    this.trackWidth = 1100;
    this.finishLine = this.trackWidth - 50;

    this.updateDisplay();
  }

  calculateNextStep() {
    if (this.currentStep === 0) {
      return {
        achillesTarget: this.tortoisePosition,
        tortoiseTarget:
          this.tortoisePosition +
          (this.tortoisePosition - this.achillesPosition) / this.achillesSpeed,
        explanation:
          "Initial setup: Achilles starts at 20px, Tortoise gets a head start at 200px.",
      };
    }

    const distanceToTravel = this.tortoisePosition - this.achillesPosition;
    const timeToReach = distanceToTravel / this.achillesSpeed;
    const tortoiseMovement = timeToReach * this.tortoiseSpeed;
    const newAchillesPos = this.tortoisePosition;
    const newTortoisePos = this.tortoisePosition + tortoiseMovement;

    return {
      achillesTarget: Math.min(newAchillesPos, this.finishLine),
      tortoiseTarget: Math.min(newTortoisePos, this.finishLine),
      distance: distanceToTravel,
      timeToReach: timeToReach,
      tortoiseMovement: tortoiseMovement,
      explanation: `Step ${
        this.currentStep
      }: Achilles travels ${distanceToTravel.toFixed(
        1
      )}px to reach where tortoise was, but tortoise moves ${tortoiseMovement.toFixed(
        1
      )}px further in that time.`,
    };
  }

  nextStep() {
    if (this.isAnimating) return;

    this.currentStep++;
    const stepData = this.calculateNextStep();
    this.isAnimating = true;

    this.animateToPositions(
      stepData.achillesTarget,
      stepData.tortoiseTarget,
      () => {
        this.achillesPosition = stepData.achillesTarget;
        this.tortoisePosition = stepData.tortoiseTarget;
        this.isAnimating = false;

        this.updateStepInfo(stepData);
        this.updateDisplay();

        if (
          this.autoMode &&
          this.achillesPosition < this.tortoisePosition &&
          this.currentStep < 20
        ) {
          setTimeout(() => this.nextStep(), 1000);
        } else if (this.autoMode) {
          this.toggleAutoMode();
        }
      }
    );
  }

  animateToPositions(achillesTarget, tortoiseTarget, callback) {
    this.achilles.style.left = achillesTarget + "px";
    this.tortoise.style.left = tortoiseTarget + "px";
    setTimeout(callback, 500);
  }

  updateStepInfo(stepData) {
    let infoHTML = `<div class="step-number">Step ${this.currentStep}</div>`;
    infoHTML += `<div>${stepData.explanation}</div>`;

    if (stepData.distance !== undefined) {
      infoHTML += `<div style="margin-top: 10px; font-size: 14px;">`;
      infoHTML += `• Distance Achilles travels: ${stepData.distance.toFixed(
        2
      )}px<br>`;
      infoHTML += `• Time taken: ${stepData.timeToReach.toFixed(2)} units<br>`;
      infoHTML += `• Tortoise moves: ${stepData.tortoiseMovement.toFixed(
        2
      )}px in that time`;
      infoHTML += `</div>`;
    }

    if (this.currentStep > 5) {
      const remainingDistance = this.tortoisePosition - this.achillesPosition;
      infoHTML += `<div style="margin-top: 10px; color: #ffeb3b;">`;
      infoHTML += `Gap remaining: ${remainingDistance.toFixed(
        3
      )}px (getting smaller!)`;
      infoHTML += `</div>`;
    }

    if (Math.abs(this.tortoisePosition - this.achillesPosition) < 1) {
      infoHTML += `<div style="margin-top: 10px; color: #4CAF50; font-weight: bold;">`;
      infoHTML += `🎉 Achilles has practically caught the tortoise! The infinite series converged!`;
      infoHTML += `</div>`;
    }

    this.stepInfo.innerHTML = infoHTML;
  }

  updateDisplay() {
    this.stepCounter.textContent = this.currentStep;
    this.achillesPos.textContent = Math.round(this.achillesPosition);
    this.tortoisePos.textContent = Math.round(this.tortoisePosition);
  }

  startAnimation() {
    if (this.currentStep === 0) {
      this.nextStep();
    }
  }

  resetAnimation() {
    if (this.autoInterval) {
      clearInterval(this.autoInterval);
      this.autoInterval = null;
    }

    this.autoMode = false;
    this.isAnimating = false;
    this.currentStep = 0;
    this.achillesPosition = 20;
    this.tortoisePosition = this.initialTortoisePosition;

    this.achilles.style.left = this.achillesPosition + "px";
    this.tortoise.style.left = this.tortoisePosition + "px";

    this.stepInfo.innerHTML =
      'Click "Start Race" or "Next Step" to begin the demonstration!';
    this.updateDisplay();

    const autoButton = document.querySelector(
      'button[onclick="toggleAutoMode()"]'
    );
    autoButton.textContent = "Auto Mode";
  }

  toggleAutoMode() {
    this.autoMode = !this.autoMode;
    const autoButton = document.querySelector(
      'button[onclick="toggleAutoMode()"]'
    );

    if (this.autoMode) {
      autoButton.textContent = "Stop Auto";
      if (!this.isAnimating) {
        this.nextStep();
      }
    } else {
      autoButton.textContent = "Auto Mode";
    }
  }
}

let paradoxAnimation;

window.addEventListener("DOMContentLoaded", () => {
  paradoxAnimation = new ZenosParadox();
});

const startAnimation = () => paradoxAnimation.startAnimation();
const nextStep = () => paradoxAnimation.nextStep();
const resetAnimation = () => paradoxAnimation.resetAnimation();
const toggleAutoMode = () => paradoxAnimation.toggleAutoMode();

document.addEventListener("DOMContentLoaded", () => {
  createFloatingParticles();

  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case " ":
      case "Enter":
        e.preventDefault();
        nextStep();
        break;
      case "r":
      case "R":
        resetAnimation();
        break;
      case "a":
      case "A":
        toggleAutoMode();
        break;
    }
  });
});

function createFloatingParticles() {
  const symbols = ["∞", "≈", "→", "∑", "½", "¼", "⅛"];
  const container = document.body;

  const createParticle = () => {
    const particle = document.createElement("div");
    particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    particle.style.cssText = `
      position: fixed;
      color: rgba(255, 255, 255, 0.1);
      font-size: ${Math.random() * 20 + 10}px;
      pointer-events: none;
      z-index: -1;
      left: ${Math.random() * window.innerWidth}px;
      top: ${window.innerHeight + 50}px;
      animation: float ${Math.random() * 10 + 10}s linear infinite;
    `;

    container.appendChild(particle);
    setTimeout(() => particle.parentNode?.removeChild(particle), 20000);
  };

  const style = document.createElement("style");
  style.textContent = `
    @keyframes float {
      to {
        transform: translateY(-${window.innerHeight + 100}px) rotate(360deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  setInterval(createParticle, 3000);
}
