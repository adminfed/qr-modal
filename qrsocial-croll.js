document.addEventListener("DOMContentLoaded", function () {
  const galleryThumbs = document.getElementById("modalThumbs");

  const galleryImageContainer = document.getElementById("imageContainer");

  const galleryModalImg = document.getElementById("modalImg");

  const galleryPrevBtn = document.getElementById("prevBtn");

  const galleryNextBtn = document.getElementById("nextBtn");

  // ==========================================
  // 1. CUỘN CHUỘT TRÊN THUMBNAIL
  // ==========================================

  if (galleryThumbs) {
    galleryThumbs.addEventListener(
      "wheel",
      function (e) {
        if (
          Math.abs(e.deltaY) > Math.abs(e.deltaX) &&
          galleryThumbs.scrollWidth > galleryThumbs.clientWidth
        ) {
          e.preventDefault();

          galleryThumbs.scrollLeft += e.deltaY * 1.5;
        }
      },
      {
        passive: false,
      },
    );

    // ==========================================
    // 2. CLICK THUMBNAIL
    // ==========================================

    galleryThumbs.addEventListener("click", function (e) {
      const targetThumb = e.target.closest("img, .thumb-item");

      if (!targetThumb) {
        return;
      }

      setTimeout(function () {
        syncGalleryThumbnail();
      }, 50);
    });
  }

  // ==========================================
  // 3. CUỘN CHUỘT TRÊN ẢNH CHÍNH
  // ==========================================

  if (galleryImageContainer) {
    galleryImageContainer.addEventListener(
      "wheel",
      function (e) {
        /*
         * Chỉ xử lý khi người dùng cuộn
         * theo chiều dọc.
         */

        if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) {
          return;
        }

        /*
         * Ngăn trang phía sau popup cuộn.
         */

        e.preventDefault();

        /*
         * Chống chuyển ảnh quá nhanh.
         */

        if (galleryWheelLocked) {
          return;
        }

        galleryWheelLocked = true;

        /*
         * Cuộn xuống
         * → ảnh tiếp theo
         */

        if (e.deltaY > 0) {
          if (galleryNextBtn) {
            galleryNextBtn.click();
          }
        } else {
          /*
           * Cuộn lên
           * → ảnh trước
           */

          if (galleryPrevBtn) {
            galleryPrevBtn.click();
          }
        }

        /*
         * Cho phép cuộn ảnh tiếp theo
         * sau 350ms.
         */

        setTimeout(function () {
          galleryWheelLocked = false;
        }, 350);
      },
      {
        passive: false,
      },
    );
  }

  // Khóa wheel trong thời gian ngắn

  let galleryWheelLocked = false;

  // ==========================================
  // 4. TÌM THUMBNAIL ĐANG HIỂN THỊ
  // ==========================================

  function getCurrentGalleryThumbnail() {
    if (!galleryThumbs || !galleryModalImg) {
      return null;
    }

    /*
     * Ưu tiên thumbnail đang active
     */

    const activeThumb = galleryThumbs.querySelector(
      '.active, .selected, [aria-selected="true"]',
    );

    if (activeThumb) {
      return activeThumb;
    }

    /*
     * Nếu không có active,
     * tìm thumbnail có cùng src với ảnh chính.
     */

    const currentSrc = galleryModalImg.currentSrc || galleryModalImg.src;

    if (!currentSrc) {
      return null;
    }

    const thumbnails = galleryThumbs.querySelectorAll("img");

    for (let i = 0; i < thumbnails.length; i++) {
      const thumb = thumbnails[i];

      const thumbSrc = thumb.currentSrc || thumb.src;

      if (
        thumbSrc &&
        (thumbSrc === currentSrc ||
          decodeImageUrl(thumbSrc) === decodeImageUrl(currentSrc))
      ) {
        return thumb;
      }
    }

    return null;
  }

  // ==========================================
  // 5. CHUẨN HÓA URL ẢNH
  // ==========================================

  function decodeImageUrl(url) {
    try {
      return decodeURIComponent(url).split("?")[0].split("#")[0];
    } catch (e) {
      return url;
    }
  }

  // ==========================================
  // 6. CUỘN THUMBNAIL THEO ẢNH CHÍNH
  // ==========================================

  function syncGalleryThumbnail() {
    if (!galleryThumbs) {
      return;
    }

    const activeThumb = getCurrentGalleryThumbnail();

    if (!activeThumb) {
      return;
    }

    const containerRect = galleryThumbs.getBoundingClientRect();

    const thumbRect = activeThumb.getBoundingClientRect();

    /*
     * Tâm thumbnail
     */

    const thumbCenter = thumbRect.left + thumbRect.width / 2;

    /*
     * Tâm vùng thumbnail
     */

    const containerCenter = containerRect.left + containerRect.width / 2;

    /*
     * Khoảng cách cần cuộn
     */

    const distance = thumbCenter - containerCenter;

    galleryThumbs.scrollTo({
      left: galleryThumbs.scrollLeft + distance,

      behavior: "smooth",
    });
  }

  // ==========================================
  // 7. THEO DÕI ACTIVE THUMBNAIL
  // ==========================================

  if (galleryThumbs) {
    const observer = new MutationObserver(function (mutations) {
      let shouldSync = false;

      mutations.forEach(function (mutation) {
        if (
          mutation.type === "attributes" &&
          (mutation.attributeName === "class" ||
            mutation.attributeName === "aria-selected")
        ) {
          const target = mutation.target;

          if (
            target.classList.contains("active") ||
            target.classList.contains("selected") ||
            target.getAttribute("aria-selected") === "true"
          ) {
            shouldSync = true;
          }
        }
      });

      if (shouldSync) {
        syncGalleryThumbnail();
      }
    });

    observer.observe(galleryThumbs, {
      attributes: true,

      subtree: true,

      attributeFilter: ["class", "aria-selected"],
    });
  }

  // ==========================================
  // 8. KHI BẤM NEXT
  // ==========================================

  if (galleryNextBtn) {
    galleryNextBtn.addEventListener("click", function () {
      setTimeout(function () {
        syncGalleryThumbnail();
      }, 80);
    });
  }

  // ==========================================
  // 9. KHI BẤM PREVIOUS
  // ==========================================

  if (galleryPrevBtn) {
    galleryPrevBtn.addEventListener("click", function () {
      setTimeout(function () {
        syncGalleryThumbnail();
      }, 80);
    });
  }

  // ==========================================
  // 10. SWIPE ẢNH TRÊN ĐIỆN THOẠI
  // ==========================================

  let startX = 0;

  let endX = 0;

  let isDragging = false;

  if (galleryImageContainer) {
    // ------------------------------------------
    // TOUCH START
    // ------------------------------------------

    galleryImageContainer.addEventListener(
      "touchstart",
      function (e) {
        if (!e.touches || !e.touches.length) {
          return;
        }

        startX = e.touches[0].clientX;
      },
      {
        passive: true,
      },
    );

    // ------------------------------------------
    // TOUCH END
    // ------------------------------------------

    galleryImageContainer.addEventListener(
      "touchend",
      function (e) {
        if (!e.changedTouches || !e.changedTouches.length) {
          return;
        }

        endX = e.changedTouches[0].clientX;

        handleGallerySwipe();
      },
      {
        passive: true,
      },
    );

    // ------------------------------------------
    // MOUSE DOWN
    // ------------------------------------------

    galleryImageContainer.addEventListener("mousedown", function (e) {
      isDragging = true;

      startX = e.clientX;
    });

    // ------------------------------------------
    // MOUSE UP
    // ------------------------------------------

    galleryImageContainer.addEventListener("mouseup", function (e) {
      if (!isDragging) {
        return;
      }

      isDragging = false;

      endX = e.clientX;

      handleGallerySwipe();
    });

    // ------------------------------------------
    // MOUSE LEAVE
    // ------------------------------------------

    galleryImageContainer.addEventListener("mouseleave", function () {
      isDragging = false;
    });
  }

  // ==========================================
  // 11. XỬ LÝ SWIPE
  // ==========================================

  function handleGallerySwipe() {
    const threshold = 50;

    const diffX = startX - endX;

    if (Math.abs(diffX) <= threshold) {
      return;
    }

    /*
     * Vuốt trái
     * → Next
     */

    if (diffX > 0) {
      if (galleryNextBtn) {
        galleryNextBtn.click();
      }
    } else {
      /*
       * Vuốt phải
       * → Previous
       */

      if (galleryPrevBtn) {
        galleryPrevBtn.click();
      }
    }
  }
});
