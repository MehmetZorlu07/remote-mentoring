import React from 'react'

class ApplicationsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          projects: [],
        };
        this.getProjects = this.getProjects.bind(this);
      }
    
      componentDidMount() {
        this.getProjects();
      }

      getAllApplications = () => {
        fetch("http://localhost:3000/allApplications", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            projectid: this.props.user.id,
            }),
        })
            .then((response) => response.json())
            .then((researcherProjects) => {
                 this.setState({ ids: researcherProjects });
            });
          };

    render() {
    return (
        <div>
            
        </div>
    )}
}

export default ApplicationsPage
