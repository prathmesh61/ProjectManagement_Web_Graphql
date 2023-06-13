import { InMemoryCache, useMutation, useQuery } from "@apollo/client";
import { gql } from "graphql-tag";
import ProjectsList from "./ProjectsList";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const AddProject = () => {
  const CREATE_POST = gql`
    mutation ($name: String!, $projectName: String!, $phone: Int!) {
      addProject(name: $name, projectName: $projectName, phone: $phone) {
        id
        name
        projectName
      }
    }
  `;

  const showToastMessage = () => {
    toast.success("Success Notification !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const [addProject] = useMutation(CREATE_POST);

  const [projectName, setProjectName] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addProject({
      variables: {
        name: name,
        projectName: projectName,
        phone: Number(phone),
      },
      refetchQueries: [{ query: ProjectsList }],
    });
    showToastMessage();
    setInterval(() => {
      window.location.reload();
    }, 1000);
  };
  return (
    <>
      <div class="p-5 d-flex flex-column justify-content-center align-items-center ">
        <div class="d-flex justify-content-center align-items-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW9SmHhnkOsvtYVXM2ZlbZZXhS01KJOs5m2w&usqp=CAU"
            class="w-25"
          />
          <h1 class="fw-bold fs-1">Projects Catlog</h1>
        </div>
        <form className="container-md " onSubmit={handleSubmit}>
          <div class="mb-3">
            <label for="exampleInputText1" class="form-label fw-semibold fs-4">
              Name
            </label>
            <input
              type="text"
              value={name}
              class="form-control w-50 "
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setName(e.target.value)}
            />
            <div id="emailHelp" class="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div class="mb-3">
            <label for="exampleInputText1" class="form-label fw-semibold fs-4">
              Project-Name
            </label>
            <input
              type="text"
              class="form-control w-50"
              id="exampleInputText1"
              onChange={(e) => setProjectName(e.target.value)}
              value={projectName}
            />
          </div>
          <div class="mb-3">
            <label
              for="exampleInputNumber1"
              class="form-label fw-semibold fs-4"
            >
              Phone
            </label>
            <input
              class="form-control w-50"
              id="exampleInputNumber1"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
          </div>
          <div id="emailHelp" class="form-text mb-4">
            We'll never share your email with anyone else.
          </div>

          <button type="submit" class="btn btn-primary w-25">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};
