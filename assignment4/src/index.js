//fetch preview and show on the preview container
const preview = document.querySelector("#preview");
const previewContainer = document.querySelector("#preview_container");

const getData = async () => {
  try {
    const data = await fetch("http://localhost:3000/posts");
    const result = await data.json();
    // console.log("this is result", result);

    result.sort(
      (a, b) => new Date(b["created_at"]) - new Date(a["created_at"])
    );
    const previewData = result.splice(0, 20);
    displayPreview(previewData);
  } catch (error) {
    console.error(error);
  }
};

getData();

function displayPreview(data) {
  let dataTemplate = ``;
  data.map((item) => {
    dataTemplate += `
    <div id=${item.id} class="previewItem">
      <img src=${item.image_url} alt="previewImg" class="previewImg" />
      <p>${item.content.split(" ").splice(0, 10).join(" ")} ...</p>
      <div class="author">${item.created_by}</div>
    </div>
    
    `;
    previewContainer.innerHTML = dataTemplate;
  });
}
