import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import history from "../../history";

class EditProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      information: "",
      type: "",
    };
  }

  componentDidMount() {
    this.setState({
      name: this.props.user.name,
      email: this.props.user.email, 
      information: this.props.user.information, 
      type: this.props.user.type});
  }

  onNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  onInformationChange = (event) => {
    this.setState({ information: event.target.value });
  };

  onTypeChange = (event) => {
    this.setState({ type: event.target.value });
  };

  onUpdateProfile = () => {
    fetch("http://localhost:3000/updateProfile", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: this.props.user.id,
        name: this.state.name,
        email: this.state.email,
        information: this.state.information,
        type: this.state.type
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user) {
          this.props.loadUser(user);
          history.push("/account");
        }
      });
  };


  render() {
    return (
      <div>
      <Card style={{ width: "40rem" }}>
        <Form>
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              defaultValue={this.state.name}
              type="name"
              onChange={this.onNameChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              defaultValue={this.state.email}
              type="email"
              onChange={this.onEmailChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicInformation">
            <Form.Label>Information</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              defaultValue={this.state.information}
              onChange={this.onInformationChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicType">
            <Form.Label>Type</Form.Label>
            <Form.Control as="select" onChange={this.onTypeChange}>
              <option>researcher</option>
              <option>academic</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" onClick={this.onUpdateProfile}>
            Update Profile
          </Button>
        </Form>
        </Card>
      </div>
    );
  }
}

export default EditProfile;
