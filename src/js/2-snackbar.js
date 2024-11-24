import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const delay = parseInt(document.querySelector('[name="delay"]').value, 10);
    const radio = event.currentTarget.elements.state.value;

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (radio === "fulfilled") {
                resolve(delay);
            }
            else {
                reject(delay);
            }
        }, delay);
    });

    promise
        .then((delay) => {
            iziToast.success({
                message: `✅ Fulfilled promise in ${delay}ms`,
            });
        })
        .catch((delay) => {
            iziToast.error({
                message: `❌ Rejected promise in ${delay}ms`,
            });
        })
});