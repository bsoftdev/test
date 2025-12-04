const menuItems = document.querySelectorAll(".menu-item");
const pages = document.querySelectorAll(".page");

menuItems.forEach(item => {
    item.addEventListener("click", () => {
        menuItems.forEach(i => i.classList.remove("active"));
        item.classList.add("active");

        const page = item.dataset.page;
        pages.forEach(p => p.classList.remove("active"));
        document.getElementById(page).classList.add("active");
    });
});
