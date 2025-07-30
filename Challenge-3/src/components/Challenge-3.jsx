import "../styles/Challenge-3.css";

const Challenge3 = () => {
  return (
    <div className="container">
      <div className="header">Header</div>

      <div className="main-content">
        <div className="left-side">
          <div className="hero">Hero</div>
          <div className="sidebar">Sidebar</div>
        </div>

        <div className="right-side">
          <div className="main">
            <div className="main-title">Main Content</div>
            <div className="main-description">
              **If things do not look right, make sure your browser is in
              "Experimental Mode".
            </div>
          </div>
          <div className="extra">Extra Content</div>
        </div>
      </div>

      <div className="bottom-section">
        <div className="related-images">Related Images</div>
        <div className="related-posts">
          Related <br /> Posts
        </div>
      </div>

      <div className="footer">Footer</div>
    </div>
  );
};

export default Challenge3;
