import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import history from "../../history";
import { TAGS } from "../../utils/config";

class EditProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      information: "",
      type: "",
      tags: [],
    };
  }

  componentDidMount() {
    this.setState({
      name: this.props.user.name,
      email: this.props.user.email,
      information: this.props.user.information,
      type: this.props.user.type,
    });
    if (this.props.user.tags != null) {
      this.setState({ tags: this.props.user.tags });
    }
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

  onTagsChange = (tag) => {
    if (!this.state.tags.includes(tag)) {
      this.setState({ tags: this.state.tags.concat([tag]) });
    }
  };

  onRemoveTag = (tag) => {
    this.setState({ tags: this.state.tags.filter((t) => t !== tag) });
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
        type: this.state.type,
        tags: this.state.tags,
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
      <Container className="page">
        <Card className="form">
          <div className="form__title">Edit Profile</div>
          <Form>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name: </Form.Label>
              <Form.Control
                defaultValue={this.state.name}
                type="name"
                onChange={this.onNameChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address: </Form.Label>
              <Form.Control
                defaultValue={this.state.email}
                type="email"
                onChange={this.onEmailChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicInformation">
              <Form.Label>Information: </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                defaultValue={this.state.information}
                onChange={this.onInformationChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicType">
              <Form.Label>Type: </Form.Label>
              <Form.Control as="select" onChange={this.onTypeChange}>
                <option>researcher</option>
                <option>academic</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formTags">
              <Form.Label>Interests: </Form.Label>
              <TagsInput onChange={this.onTagsChange} />
              {!!this.state.tags.length && (
                <div className="tags">
                  {this.state.tags.map((tag, index) => {
                    return (
                      <div key={`tag-${index}`} className="tag">
                        {tag}
                        <span
                          className="tag__icon fa fa-times-circle"
                          onClick={this.onRemoveTag.bind(this, tag)}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </Form.Group>
            <div className="form__footer">
              <Button variant="primary" onClick={this.onUpdateProfile}>
                Update Profile
              </Button>
            </div>
          </Form>
        </Card>
      </Container>
    );
  }
}

class TagsInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      tags: [],
    };
  }

  onInputChange = (e) => {
    let value = e.target.value;
    let tags = TAGS.filter((tag) => {
      return tag.toLowerCase().includes(value.toLowerCase());
    });

    this.setState({ value, tags });
  };

  onSelectTag = (tag) => {
    this.props.onChange(tag);
    this.setState({ value: "", tags: [] });
  };

  render() {
    return (
      <div className="">
        <input
          className="form-control tags-input"
          value={this.state.value}
          onChange={this.onInputChange}
        />
        {!!this.state.tags.length && (
          <div className="tags-input__tags">
            {this.state.tags.map((tag, index) => {
              return (
                <div
                  key={`tag-item-${index}`}
                  className="tags-input__tags__item"
                  onClick={this.onSelectTag.bind(this, tag)}
                >
                  {tag}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default EditProfile;
