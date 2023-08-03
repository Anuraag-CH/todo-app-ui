import { useState } from "react";

function Text() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = () => {
    // Prepare the data to be sent to the API
    const data = {
      title: title,
      description: description,
    };

    // Make the API call using fetch or any other suitable method
    fetch(import.meta.env.VITE_URL + "/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Handle the response from the API if needed
        console.log(data);
      })
      .catch((error) => {
        // Handle errors if any
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <div>
        Title
        <br />
        <input type="text" value={title} onChange={handleTitleChange} />
      </div>
      <div>
        Description
        <br />
        <input
          type="text"
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Text;
