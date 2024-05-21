export default function Dashboard() {
  return (
      <div id="wd-dashboard">
          <h1 id="wd-dashboard-title">Dashboard</h1>
          <hr />
          <h2 id="wd-dashboard-published">Published Courses (12)</h2>
          <hr />
          <div id="wd-dashboard-courses" className="row">
              <div className="row row-cols-1 row-cols-md-4 g-4">
                  <div className="wd-dashboard-course col" style={{ width: "270px" }}>
                      <div className="card">
                          <img src="/images/reactjs.jpg" alt="Course" />
                          <div className="card-body">
                              <a className="wd-dashboard-course-link"
                                  href="#/Kanbas/Courses/1234/Home"
                                  style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>
                                  CS1234 React JS
                              </a>
                              <p className="wd-dashboard-course-title card-text">
                                  Full Stack software developer
                              </p>
                              <a href="#/Kanbas/Courses/1234/Home" className="btn btn-primary"> Go </a>
                          </div>
                      </div>
                  </div>
                  <div className="wd-dashboard-course col" style={{ width: "270px" }}>
                      <div className="card">
                          <img src="/images/reactjs.jpg" alt="Course" />
                          <div className="card-body">
                              <a className="wd-dashboard-course-link"
                                  href="#/Kanbas/Courses/2/Home"
                                  style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>
                                  Mischief 2
                              </a>
                              <p className="wd-dashboard-course-title card-text">
                                  Mischief
                              </p>
                              <a href="#/Kanbas/Courses/2/Home" className="btn btn-primary"> Go </a>
                          </div>
                      </div>
                  </div>
                  <div className="wd-dashboard-course col" style={{ width: "270px" }}>
                      <div className="card">
                          <img src="/images/reactjs.jpg" alt="Course" />
                          <div className="card-body">
                              <a className="wd-dashboard-course-link"
                                  href="#/Kanbas/Courses/3/Home"
                                  style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>
                                  Scoundrel Behavior
                              </a>
                              <p className="wd-dashboard-course-title card-text">
                                  Scoundrels
                              </p>
                              <a href="#/Kanbas/Courses/3/Home" className="btn btn-primary"> Go </a>
                          </div>
                      </div>
                  </div>
                  <div className="wd-dashboard-course col" style={{ width: "270px" }}>
                      <div className="card">
                          <img src="/images/reactjs.jpg" alt="Course" />
                          <div className="card-body">
                              <a className="wd-dashboard-course-link"
                                  href="#/Kanbas/Courses/4/Home"
                                  style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>
                                  Scallywagging
                              </a>
                              <p className="wd-dashboard-course-title card-text">
                                  Scalliest of wags
                              </p>
                              <a href="#/Kanbas/Courses/4/Home" className="btn btn-primary"> Go </a>
                          </div>
                      </div>
                  </div>
                  <div className="wd-dashboard-course col" style={{ width: "270px" }}>
                      <div className="card">
                          <img src="/images/reactjs.jpg" alt="Course" />
                          <div className="card-body">
                              <a className="wd-dashboard-course-link"
                                  href="#/Kanbas/Courses/5/Home"
                                  style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>
                                  Banditry
                              </a>
                              <p className="wd-dashboard-course-title card-text">
                                  The most greedy bandits
                              </p>
                              <a href="#/Kanbas/Courses/5/Home" className="btn btn-primary"> Go </a>
                          </div>
                      </div>
                  </div>
                  <div className="wd-dashboard-course col" style={{ width: "270px" }}>
                      <div className="card">
                          <img src="/images/reactjs.jpg" alt="Course" />
                          <div className="card-body">
                              <a className="wd-dashboard-course-link"
                                  href="#/Kanbas/Courses/6/Home"
                                  style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>
                                  Skulldoggery
                              </a>
                              <p className="wd-dashboard-course-title card-text">
                                  Dogs of the skull
                              </p>
                              <a href="#/Kanbas/Courses/6/Home" className="btn btn-primary"> Go </a>
                          </div>
                      </div>
                  </div>
                  <div className="wd-dashboard-course col" style={{ width: "270px" }}>
                      <div className="card">
                          <img src="/images/reactjs.jpg" alt="Course" />
                          <div className="card-body">
                              <a className="wd-dashboard-course-link"
                                  href="#/Kanbas/Courses/7/Home"
                                  style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }}>
                                  Basketry
                              </a>
                              <p className="wd-dashboard-course-title card-text">
                                  Underwater?
                              </p>
                              <a href="#/Kanbas/Courses/7/Home" className="btn btn-primary"> Go </a>
                          </div>
                      </div>
                  </div>
                  {/* Add more course items as needed */}
              </div>
          </div>
      </div>
  );
}
