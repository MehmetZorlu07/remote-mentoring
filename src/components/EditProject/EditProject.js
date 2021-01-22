import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import history from "../../history";
import RangeSlider from "react-bootstrap-range-slider";
import { TAGS } from "../../utils/config";

class EditProject extends React.Component {
  constructor(props) {
    super();
    this.state = {
      project: {},
      title: "",
      description: "",
      tags: [],
      requirements: "",
      rangeValue: 1,
      status: "",
    };

    this.getProject = this.getProject.bind(this);
  }

  componentDidMount() {
    let projectid = this.props.match.params.projectid;
    this.getProject(projectid.toString());
  }

  onTitleChange = (event) => {
    this.setState({ title: event.target.value });
  };

  onDescriptionChange = (event) => {
    this.setState({ description: event.target.value });
  };

  onRequirementsChange = (event) => {
    this.setState({ requirements: event.target.value });
  };

  onTagsChange = (tag) => {
    if (!this.state.tags.includes(tag)) {
      this.setState({ tags: this.state.tags.concat([tag]) });
    }
  };

  onRemoveTag = (tag) => {
    this.setState({ tags: this.state.tags.filter((t) => t !== tag) });
  };

  onRangeChange = (event) => {
    this.setState({ rangeValue: event.target.value });
  };

  onStatusChange = (event) => {
    this.setState({ status: event.target.value });
  };

  onApplyChanges = () => {
    fetch("http://localhost:3000/applyChanges", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: this.state.project.projectid,
        name: this.state.title,
        description: this.state.description,
        tags: this.state.tags,
        requirements: this.state.requirements,
        rangeValue: this.state.rangeValue,
        status: this.state.status,
      }),
    })
      .then((response) => response.json())
      .then((project) => {
        if (project) {
          history.push("/project/" + project.projectid);
        }
      });
  };

  getProject = (projectid) => {
    fetch("http://localhost:3000/edit-project/" + projectid)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ project: data });
        this.setState({ title: data.name });
        this.setState({ description: data.description });
        this.setState({ requirements: data.requirements });
        this.setState({ rangeValue: data.capacity });
        this.setState({ status: data.status });
        if (data.tags != null) {
          this.setState({ tags: data.tags });
        }
      });
  };

  options = ["open", "ongoing", "closed"];

  render() {
    return (
      <Container className="page">
        <Card className="form">
          <div className="form__title">Edit Project</div>
          <Form>
            <Form.Group controlId="formBasicTitle">
              <Form.Label>Project Title</Form.Label>
              <Form.Control
                defaultValue={this.state.project.name}
                onChange={this.onTitleChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicDescription">
              <Form.Label>Project Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                defaultValue={this.state.project.description}
                onChange={this.onDescriptionChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicRequirements">
              <Form.Label>Minimum Requirements</Form.Label>
              <Form.Control
                as="textarea"
                rows={1}
                defaultValue={this.state.project.requirements}
                onChange={this.onRequirementsChange}
                placeholder="Example: MSc or MA, Good knowledge of Python"
              />
            </Form.Group>
            <Form.Group controlId="formTags">
              <Form.Label>Project Tags</Form.Label>
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
            <Form.Group controlId="formBasicCapacity">
              <Form.Label>Project Capacity</Form.Label>
              <RangeSlider
                value={this.state.rangeValue}
                onChange={this.onRangeChange}
                min={1}
                max={20}
              />
            </Form.Group>
            <Form.Group controlId="formBasicStatus">
              <Form.Label>Project Status</Form.Label>
              <Form.Control
                as="select"
                onChange={this.onStatusChange}
                value={this.state.status}
              >
                <option>open</option>
                <option>ongoing</option>
                <option>closed</option>
              </Form.Control>
            </Form.Group>
            <div className="form__footer">
              <Button variant="primary" onClick={this.onApplyChanges}>
                Apply Changes
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
          placeholder="Example: Mathematics"
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

export default EditProject;
