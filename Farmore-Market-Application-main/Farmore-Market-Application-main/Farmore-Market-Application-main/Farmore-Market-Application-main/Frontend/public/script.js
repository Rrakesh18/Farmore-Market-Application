

 const box = document.getElementById("box");
    const button = document.getElementById("onclick");

    // Add click event to the button
    button.addEventListener("click", function() {
      // Make the box visible
      box.style.display = "block";

      // Randomly choose a color: red or blue
      const colors = ["red", "blue"];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      // Apply the random color
      box.style.backgroundColor = randomColor;
    });