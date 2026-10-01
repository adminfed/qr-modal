document.addEventListener("DOMContentLoaded", function () {
  const modalThumbs = document.getElementById("modalThumbs");

  const imageContainer = document.getElementById("imageContainer");

  const prevBtn = document.getElementById("prevBtn");

  const nextBtn = document.getElementById("nextBtn");

  // ==========================================
  // 1. & 2. CUỘN THUMBNAIL
  // ==========================================

  if (modalThumbs) {
    modalThumbs.addEventListener(
      "wheel",
      function (e) {
        /*
         * Chỉ chuyển cuộn dọc thành cuộn ngang
         * khi thumbnail thực sự có thể cuộn.
         */

        if (
          Math.abs(e.deltaY) > Math.abs(e.deltaX) &&
          modalThumbs.scrollWidth > modalThumbs.clientWidth
        ) {
          e.preventDefault();

          modalThumbs.scrollLeft += e.deltaY * 1.5;
        }
      },
      {
        passive: false,
      },
    );

    // ==========================================
    // CLICK THUMBNAIL
    // ==========================================

    modalThumbs.addEventListener("click", function (e) {
      const targetThumb = e.target.closest("img, .thumb-item");

      if (targetThumb) {
        scrollToActiveThumb(targetThumb);
      }
    });

    // ==========================================
    // THEO DÕI THUMBNAIL ACTIVE
    // ==========================================

    const observer = new MutationObserver(function (mutations) {
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
            scrollToActiveThumb(target);
          }
        }
      });
    });

    observer.observe(modalThumbs, {
      attributes: true,

      subtree: true,

      attributeFilter: ["class", "aria-selected"],
    });
  }

  // ==========================================
  // 3. CUỘN THUMBNAIL ĐẾN ẢNH ĐANG CHỌN
  // ==========================================

  window.scrollToActiveThumb = function (activeThumbElement) {
    if (!activeThumbElement || !modalThumbs) {
      return;
    }

    const thumbRect = activeThumbElement.getBoundingClientRect();

    const containerRect = modalThumbs.getBoundingClientRect();

    /*
     * Tính khoảng cách từ tâm thumbnail
     * đến tâm vùng thumbnail.
     */

    const thumbCenter = thumbRect.left + thumbRect.width / 2;

    const containerCenter = containerRect.left + containerRect.width / 2;

    const distance = thumbCenter - containerCenter;

    modalThumbs.scrollTo({
      left: modalThumbs.scrollLeft + distance,

      behavior: "smooth",
    });
  };

  // ==========================================
  // 4. CUỘN CHUỘT TRÊN ẢNH CHÍNH
  // ==========================================

  let wheelLocked = false;

  if (imageContainer) {
    imageContainer.addEventListener(
      "wheel",
      function (e) {
        /*
         * Chỉ xử lý cuộn dọc.
         */

        if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) {
          return;
        }

        /*
         * QUAN TRỌNG:
         * Không cho trang phía sau popup cuộn.
         */

        e.preventDefault();

        /*
         * Ngăn một lần lăn chuột mạnh
         * chuyển qua nhiều ảnh.
         */

        if (wheelLocked) {
          return;
        }

        wheelLocked = true;

        /*
         * Lăn xuống
         * → Next
         */

        if (e.deltaY > 0) {
          if (nextBtn) {
            nextBtn.click();
          }
        } else {

        /*
         * Lăn lên
         * → Previous
         */
          if (prevBtn) {
            prevBtn.click();
          }
        }

        /*
         * Khóa trong thời gian ngắn.
         */

        setTimeout(function () {
          wheelLocked = false;
        }, 350);
      },
      {
        passive: false,
      },
    );

    // ==========================================
    // 5. SWIPE / DRAG ẢNH CHÍNH
    // ==========================================

    let startX = 0;
    let endX = 0;
    let isDragging = false;

    // ------------------------------------------
    // MOBILE TOUCH START
    // ------------------------------------------

    imageContainer.addEventListener(
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
    // MOBILE TOUCH END
    // ------------------------------------------

    imageContainer.addEventListener(
      "touchend",
      function (e) {
        if (!e.changedTouches || !e.changedTouches.length) {
          return;
        }

        endX = e.changedTouches[0].clientX;

        handleSwipe();
      },
      {
        passive: true,
      },
    );

    // ------------------------------------------
    // DESKTOP MOUSE DOWN
    // ------------------------------------------

    imageContainer.addEventListener("mousedown", function (e) {
      isDragging = true;

      startX = e.clientX;
    });

    // ------------------------------------------
    // DESKTOP MOUSE UP
    // ------------------------------------------

    imageContainer.addEventListener("mouseup", function (e) {
      if (!isDragging) {
        return;
      }

      isDragging = false;

      endX = e.clientX;

      handleSwipe();
    });

    // ------------------------------------------
    // MOUSE LEAVE
    // ------------------------------------------

    imageContainer.addEventListener("mouseleave", function () {
      isDragging = false;
    });
  }

  // ==========================================
  // 6. XỬ LÝ SWIPE
  // ==========================================

  function handleSwipe() {
    const threshold = 50;

    const diffX = startX - endX;

    /*
     * Chưa đủ khoảng cách
     */

    if (Math.abs(diffX) <= threshold) {
      return;
    }

    /*
     * Vuốt sang trái
     * → Next
     */

    if (diffX > 0) {
      if (nextBtn) {
        nextBtn.click();
      }
    } else {

    /*
     * Vuốt sang phải
     * → Previous
     */
      if (prevBtn) {
        prevBtn.click();
      }
    }
  }
});
