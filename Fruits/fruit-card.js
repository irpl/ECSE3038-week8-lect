const template = document.createElement("template");
template.innerHTML = `
<div class="fruit-card-container">
  <div class="fruit-card-delete">
    <img class="fruit-card-delete-icon" src="Fruits/trash.png"/>
  </div>
  <div class="card-image">
    <img class="card-image-image" src="" alt="" />
  </div>

  <div class="card-icons"></div>

  <div class="card-stats">
    <div class="card-stats-inner">
      <span class="fruit-card-name"></span>
      <span class="fruit-card-sugar"></span>
      <span class="fruit-card-calories"></span>
    </div>
    <div class="card-stats-inner"></div>
  </div>
</div>
`;

class FruitCard extends HTMLElement {
  static get observedAttributes() {
    return ["name", "sugar", "calories", "colour", "image", "fruit_id"];
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName == "name") {
      this.shadowRoot.querySelector(".fruit-card-name").innerHTML = "name: " + newValue;
    }

    if (attrName == "sugar") {
      this.shadowRoot.querySelector(".fruit-card-sugar").innerHTML = "sugar content: " + newValue;
    }

    if (attrName == "calories") {
      this.shadowRoot.querySelector(".fruit-card-calories").innerHTML = "calories: " + newValue;
    }

    if (attrName == "colour") {
      this.shadowRoot.querySelector(".fruit-card-container").style.backgroundColor = newValue;
    }
    if (attrName == "image") {
      this.shadowRoot.querySelector(".card-image-image").src = newValue;
    }
    if (attrName == "fruit_id") {
      this.shadowRoot.querySelector(".fruit-card-delete").setAttribute("fruit_id", newValue);
    }
  }

  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    const css = document.createElement("link");
    css.setAttribute("rel", "stylesheet");
    css.setAttribute("href", "Fruits/fruit-card.css");
    this.shadowRoot.appendChild(css);

    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.shadowRoot.querySelector(".fruit-card-delete").addEventListener("click", function (e) {
      console.log(e.target.parentNode.getAttribute("fruit_id"));

      var fruitID = e.target.parentNode.getAttribute("fruit_id");

      fetch("http://localhost:3001/fruit/" + fruitID, {
        method: "DELETE",
      }).then(() => location.reload());
    });
  }
}

window.customElements.define("fruit-card", FruitCard);
