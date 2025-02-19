document.addEventListener("DOMContentLoaded", () => {
    let currentStep = 1;
    const steps = document.querySelectorAll(".step");
    const stepContents = document.querySelectorAll(".checkout-step");

    function showStep(step) {
        stepContents.forEach((content, index) => {
            content.classList.toggle("active", index + 1 === step);
        });

        steps.forEach((el, index) => {
            el.classList.toggle("active", index + 1 === step);
        });

        currentStep = step;
    }

    document.querySelectorAll(".next-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            if (currentStep < 3) {
                showStep(currentStep + 1);
            }
        });
    });

    document.querySelectorAll(".prev-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            if (currentStep > 1) {
                showStep(currentStep - 1);
            }
        });
    });

    document.getElementById("checkoutForm").addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Order placed successfully!");
        window.location.href = "./homepage.html";
    });

    showStep(currentStep);
});



