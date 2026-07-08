// Shared site behaviour for the academic-homepage theme.
(function () {
    var scrollTopBtn = document.getElementById('scrollTop');
    if (scrollTopBtn) {
        window.addEventListener('scroll', function () {
            scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
        });
        scrollTopBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Lightbox for gallery pages.
    var lightbox = document.getElementById('lightbox');
    if (lightbox) {
        var lightboxImg = document.getElementById('lightboxImg');
        document.querySelectorAll('.gallery-item img').forEach(function (img) {
            img.addEventListener('click', function () {
                lightboxImg.src = img.src;
                lightbox.classList.add('active');
            });
        });
        lightbox.addEventListener('click', function () {
            lightbox.classList.remove('active');
        });
    }
})();
