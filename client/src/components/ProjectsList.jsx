import { useMutation, useQuery } from "@apollo/client";
import { gql } from "graphql-tag";

const ProjectsList = () => {
  const Get_Posts = gql`
    query {
      getProjectList {
        id
        name
        projectName
        phone
      }
    }
  `;

  const DELETE_PROJECT = gql`
    mutation ($id: String) {
      deleteProject(id: $id) {
        id
      }
    }
  `;
  const showToastMessage = () => {
    toast.success("Success Notification !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    onCompleted: () => {
      window.location.reload();
    },
  });

  const handleProject = (id) => {
    deleteProject({ variables: { id } });
  };
  const { loading, error, data } = useQuery(Get_Posts);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div class="container">
      {/* {data.getProjectList.map((project) => (
        <div key={project.id} className="card-item">
          <h3>{project.name}</h3>
          <h3>{project.projectName}</h3>
          <h3>{project.phone}</h3>
          <button onClick={() => handleProject(project.id)}>Del</button>
        </div>
      ))} */}
      <table class="table ">
        <thead>
          <tr>
            <th scope="col" class="fw-semibold fs-4">
              Name
            </th>
            <th scope="col" class="fw-semibold fs-4">
              Project
            </th>
            <th scope="col" class="fw-semibold fs-4">
              Number
            </th>
          </tr>
        </thead>
        <tbody>
          {data.getProjectList.map((project) => (
            <tr>
              <td>{project.name}</td>
              <td>{project.projectName}</td>
              <td>{project.phone}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleProject(project.id)}
                >
                  Del
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectsList;
