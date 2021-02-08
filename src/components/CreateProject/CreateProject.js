import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import history from "../../history";
import "./CreateProject.css";
import RangeSlider from "react-bootstrap-range-slider";
import { TAGS } from "../../utils/config";
import { Formik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  title: yup.string().required("*Project Title is a required field"),
  description: yup.string().required("*Description is a required field"),
});

class CreateProject extends React.Component {
  constructor(props) {
    super();
    this.state = {
      title: "",
      description: "",
      requirements: "None",
      tags: [],
      rangeValue: 1,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

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

  onCreateProject = () => {
    fetch("http://localhost:3000/create-project", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: this.state.title,
        description: this.state.description,
        academicid: this.props.academicid,
        tags: this.state.tags,
        requirements: this.state.requirements,
        rangeValue: this.state.rangeValue,
        status: "open",
      }),
    })
      .then((response) => response.json())
      .then((project) => {
        if (project) {
          history.push("/project/" + project.projectid);
        }
      });
  };

  render() {
    return (
      <Container className="page">
        <Card className="form">
          <div className="form__title">Create Project</div>
          <Formik
            initialValues={this.state}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              this.setState({
                title: values.title,
                description: values.description,
              });
              this.onCreateProject();
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              touched,
              errors,
            }) => {
              return (
                <>
                  <Form>
                    <Form.Group controlId="title">
                      <Form.Label>Enter the project title:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Project Title"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.title && errors.title}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.title}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="description">
                      <Form.Label>Enter the project description:</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Project Description"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.description && errors.description}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.description}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="requirements">
                      <Form.Label>Enter the minimum requirements:</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={1}
                        placeholder="Example: MSc or MA, Good knowledge of Python"
                        onChange={this.onRequirementsChange}
                      />
                    </Form.Group>
                    <Form.Group controlId="tags">
                      <Form.Label>Select the project tags:</Form.Label>
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
                    <Form.Group controlId="capacity">
                      <Form.Label>Set the project capacity:</Form.Label>
                      <RangeSlider
                        value={this.state.rangeValue}
                        onChange={this.onRangeChange}
                        min={1}
                        max={20}
                      />
                    </Form.Group>
                  </Form>
                  <div className="form__footer">
                    <Button
                      variant="primary"
                      onClick={() => handleSubmit()}
                      className="custom-button"
                    >
                      Create
                    </Button>
                  </div>
                </>
              );
            }}
          </Formik>
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

export default CreateProject;
