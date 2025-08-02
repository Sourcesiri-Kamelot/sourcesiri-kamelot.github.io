document.addEventListener('DOMContentLoaded', function () {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');

        // Toggle dropdown on click for mobile/touch devices
        toggle.addEventListener('click', function (e) {
            if (window.innerWidth < 768) { // Simple check for mobile
                e.preventDefault();
                const menu = dropdown.querySelector('.dropdown-menu');
                if (menu) {
                    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
                }
            }
        });

        // Keep dropdown open on hover for desktop
        dropdown.addEventListener('mouseenter', function () {
            if (window.innerWidth >= 768) {
                const menu = dropdown.querySelector('.dropdown-menu');
                if (menu) {
                    menu.style.display = 'block';
                }
            }
        });

        dropdown.addEventListener('mouseleave', function () {
            if (window.innerWidth >= 768) {
                const menu = dropdown.querySelector('.dropdown-menu');
                if (menu) {
                    menu.style.display = 'none';
                }
            }
        });
    });
});
