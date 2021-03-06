import React from 'react';

function OldSidebar(props) {
    return (
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-dark sidebar collapse">
        <div className="sidebar-sticky pt-5">
            <ul className="nav pl-2 flex-column">
                <li className="nav-item">
                    <a className="nav-link active" href="#">
                        <span data-feather="home"></span>
Your Hackathons <span className="sr-only">(current)</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">
                        <span data-feather="file"></span>
All Hackathons
</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">
                        <span data-feather="shopping-cart"></span>
Products
</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">
                        <span data-feather="users"></span>
Customers
</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">
                        <span data-feather="bar-chart-2"></span>
Reports
</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">
                        <span data-feather="layers"></span>
Integrations
</a>
                </li>
            </ul>

            <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>Saved reports</span>
                <a className="d-flex align-items-center text-muted" href="#" aria-label="Add a new report">
                    <span data-feather="plus-circle"></span>
                </a>
            </h6>
            <ul className="nav pl-2 flex-column mb-2">
                <li className="nav-item">
                    <a className="nav-link" href="#">
                        <span data-feather="file-text"></span>
Current month
</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">
                        <span data-feather="file-text"></span>
Last quarter
</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">
                        <span data-feather="file-text"></span>
Social engagement
</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">
                        <span data-feather="file-text"></span>
Year-end sale
</a>
                </li>
            </ul>
        </div>
    </nav>

    );
}

export default OldSidebar;