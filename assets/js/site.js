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

    // Lightbox for gallery and artwork pages.
    var lightbox = document.getElementById('lightbox');
    if (lightbox) {
        var lightboxImg = document.getElementById('lightboxImg');
        document.querySelectorAll('.gallery-item img, .lightbox-trigger').forEach(function (img) {
            img.addEventListener('click', function (e) {
                e.stopPropagation();
                lightboxImg.src = img.getAttribute('data-full') || img.src;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        lightbox.addEventListener('click', function () {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
})();
