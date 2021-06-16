let map, popup, Popup;

/** Initializes the map and the custom popup. */
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 59.4, lng: 8.5 },
    zoom: 11,
  });

  /**
   * A customized popup on the map.
   */
  class Popup extends google.maps.OverlayView {
    position;
    containerDiv;
    constructor(position, content) {
      super();
      this.position = position;
      content.classList.add("popup-bubble");
      // This zero-height div is positioned at the bottom of the bubble.
      const bubbleAnchor = document.createElement("div");
      bubbleAnchor.classList.add("popup-bubble-anchor");
      bubbleAnchor.appendChild(content);
      // This zero-height div is positioned at the bottom of the tip.
      this.containerDiv = document.createElement("div");
      this.containerDiv.classList.add("popup-container");
      this.containerDiv.appendChild(bubbleAnchor);
      // Optionally stop clicks, etc., from bubbling up to the map.
      Popup.preventMapHitsAndGesturesFrom(this.containerDiv);
    }
    /** Called when the popup is added to the map. */
    onAdd() {
      this.getPanes().floatPane.appendChild(this.containerDiv);
    }
    /** Called when the popup is removed from the map. */
    onRemove() {
      if (this.containerDiv.parentElement) {
        this.containerDiv.parentElement.removeChild(this.containerDiv);
      }
    }
    /** Called each frame when the popup needs to draw itself. */
    draw() {
      const divPosition = this.getProjection().fromLatLngToDivPixel(
        this.position
      );
      // Hide the popup when it is far out of view.
      const display =
        Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000
          ? "block"
          : "none";

      if (display === "block") {
        this.containerDiv.style.left = divPosition.x + "px";
        this.containerDiv.style.top = divPosition.y + "px";
      }

      if (this.containerDiv.style.display !== display) {
        this.containerDiv.style.display = display;
      }
    }
  }
  popup = new Popup(
    new google.maps.LatLng(59.4, 8.5),
    document.getElementById("content")
  );
  popup.setMap(map);

  popup2 = new Popup(
    new google.maps.LatLng(59.382151032115765, 8.518744182327458),
    document.getElementById("content2")
  );
  popup2.setMap(map);

  popup3 = new Popup(
    new google.maps.LatLng(59.434380801742655, 8.476787828920683),
    document.getElementById("content3")
  );
  popup3.setMap(map);
}
