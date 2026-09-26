(function () {
  "use strict";

  const images = [
    {
      src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi-68yXhw3S2e0RRbFo1OPD1sbRgfLwZnMr-KYyw-b7IUyYfdXRCbYr1DVeDETN-o4PzEd7gtC7La_RF6sv4t0ycrMI6ZyRpCuDU4a_u7yhGcpUp_y1U_gXrVRDw-6sdBk4kNZDZIbXVR4cc94IQiQaUYqvR6E0o1D2XBf0sxuiwSM7zFKK0aA7IlC7pyte/w259-h320/Qr-Kakaotalk-Pointbookingofficial.png",
      alt: "KakaoTalk | pointbookingofficial | +84 905-926-803",
      title: "KakaoTalk QR Code | pointbookingofficial | +84 905-926-803",
      url: "https://pointbookingofficial.com/"
    },
    {
      src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgfLxmHY1bIhU8TKf97G4b8xSO9n62F2LobFQfcFd1LzYMn-XMXC8Oz_JBeK71E6xl-tMd9tkv6IGgxnkrvsQ-vRG5Ii4KeA_5cFiQgYMgsYUllmqNL69tUG3WgX48osr-bNJxBsgM326dzGP91HlII5zporU6bczSv1jrbVBCmdGi0EYTt6MGqsHmLaRD1/w267-h320/Qr-Wechat-Pointbookingofficial.png",
      alt: "WeChat QR Code | +84 905-926-803",
      title: "WeChat QR Code | +84 905-926-803",
      url: "https://pointbookingofficial.com/"
    },
    {
      src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiiNLZ8hQp7hYruI3kQBrK9PjJxiWE248j7Es7pCsxjwwCZ_K3ZHZK4IcokcLbut9Wpvz7RwGTgqSMqsk-eupxk5jG4D9a7c9Sc-exvOxS2urSNB_BQluzf0JucGag6EMCRxXMFrByAHollri1W1nzp3p9CmgXjoRB9WRKG-eC6PAeVgMN_7cSVempgmUni/w323-h306/Qr-Line-Pointbookingofficial.png",
      alt: "Line QR Code | +84 905-926-803",
      title: "Line QR Code | +84 905-926-803",
      url: "https://pointbookingofficial.com/"
    },
    {
      src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiYVNuczDfx_V7YM0dXYjV07xbqmu9-iG8l24yr5YKewFKjb03TihX6_fNbmia3Thyb9U3P5BHeEVrekb1D1BAiY9M8T65syiR3kj2xSB_Y867d24dvJM_gXZg3gleYCusOwvm_fZU7qbKDgqXVNtrIbUvnG4Jt86E_Ovil5ntwEyjmoNiTqoJ6E9VWgcv_/w236-h320/Qr-Telegram-Pointbookingofficial.png",
      alt: "Telegram QR Code | @pointbookingofficial",
      title: "Telegram QR Code | @pointbookingofficial",
      url: "https://pointbookingofficial.com/"
    },
    {
      src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiF7RI0BvlVw0_5t1sFEpThsvPIQiv0fHAnoV0bAyb13vPRdL1gU1QXuDpsiLxu4_8Cc8MWvkQZoMApLPaIYVgxEPHGgIHHooIFmXsOoGSMClff3lZd-igZsyC0_FYiYPsEBRm13KW9__JEKvR8mq7pFZXHTR8addKC0eK2g0bXlBgV_ClnYbLnVilDin_-/w244-h320/Qr-Zalo-Pointbookingofficial.png",
      alt: "Zalo QR Code | Point Booking",
      title: "Zalo QR Code | Point Booking",
      url: "https://pointbookingofficial.com/"
    }
  ];

  function initQrModal() {
    const imageModal = document.getElementById("imageModal");
    const imageContainer = document.getElementById("imageContainer");
    const modalImg = document.getElementById("modalImg");
    const modalTitle = document.getElementById("modalTitle");
    const modalThumbs = document.getElementById("modalThumbs");
    const closeBtn = document.getElementById("closeBtn");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const bookNow = document.getElementById("bookNow");

    if (!imageModal || !imageContainer || !modalImg || !closeBtn) {
      console.warn("QR Modal HTML chưa có trên trang này");
      return false;
    }

    let selectedIndex = 0;
    let scale = 1;
    let position = { x: 0, y: 0 };

    let isDragging = false;
    let lastMouse = { x: 0, y: 0 };

    const MIN_SCALE = 1;
    const MAX_SCALE = 4;
    const SCALE_STEP = 0.2;

    function clamp(value, min, max) {
      return Math.min(Math.max(value, min), max);
    }

    function getImageBounds() {
      const cw = imageContainer.clientWidth;
      const ch = imageContainer.clientHeight;
      const nw = modalImg.naturalWidth;
      const nh = modalImg.naturalHeight;

      if (!nw || !nh) {
        return {
          maxX: 0,
          maxY: 0
        };
      }

      const ratio = Math.min(cw / nw, ch / nh);

      const dw = nw * ratio * scale;
      const dh = nh * ratio * scale;

      return {
        maxX: Math.max(0, (dw - cw) / 2),
        maxY: Math.max(0, (dh - ch) / 2)
      };
    }

    function applyTransform(animate) {
      const bounds = getImageBounds();

      position.x = clamp(
        position.x,
        -bounds.maxX,
        bounds.maxX
      );

      position.y = clamp(
        position.y,
        -bounds.maxY,
        bounds.maxY
      );

      modalImg.style.transition =
        animate === false
          ? "none"
          : "transform 0.3s ease";

      modalImg.style.transform =
        "translate(" +
        position.x +
        "px, " +
        position.y +
        "px) scale(" +
        scale +
        ")";

      modalImg.classList.toggle(
        "zoomed",
        scale > 1
      );
    }

    function resetZoom() {
      scale = MIN_SCALE;
      position.x = 0;
      position.y = 0;
      isDragging = false;

      modalImg.classList.remove("dragging");

      applyTransform(true);
    }

    function updateThumbnails() {
      if (!modalThumbs) return;

      const thumbs =
        modalThumbs.querySelectorAll(".thumb");

      thumbs.forEach(function (thumb, index) {
        thumb.classList.toggle(
          "active",
          index === selectedIndex
        );
      });
    }

    function setImage(index) {
      selectedIndex =
        (index + images.length) % images.length;

      const image = images[selectedIndex];

      modalImg.src = image.src;
      modalImg.alt = image.alt;
      modalImg.title = image.title;

      if (modalTitle) {
        modalTitle.textContent = image.title;
      }

      if (bookNow) {
        bookNow.href = image.url || "#";
      }

      resetZoom();
      updateThumbnails();
    }

    function createThumbnails() {
      if (!modalThumbs) return;

      modalThumbs.innerHTML = "";

      images.forEach(function (image, index) {
        const thumb =
          document.createElement("img");

        thumb.className = "thumb";
        thumb.src = image.src;
        thumb.alt = image.alt;

        thumb.addEventListener(
          "click",
          function (event) {
            event.preventDefault();
            event.stopPropagation();

            setImage(index);
          }
        );

        modalThumbs.appendChild(thumb);
      });
    }

    function nextImage() {
      setImage(selectedIndex + 1);
    }

    function previousImage() {
      setImage(selectedIndex - 1);
    }

    function openModal(index) {
      if (typeof index !== "number") {
        index = 0;
      }

      setImage(index);

      imageModal.classList.remove("hidden");

      imageModal.setAttribute(
        "aria-hidden",
        "false"
      );

      document.body.style.overflow = "hidden";
    }

    function closeModal() {
      imageModal.classList.add("hidden");

      imageModal.setAttribute(
        "aria-hidden",
        "true"
      );

      document.body.style.overflow = "";

      resetZoom();
    }

    /*
     * Public function.
     * Cho phép menu Social QR gọi popup.
     */
    window.openQrModal = openModal;

    /*
     * Close
     */
    closeBtn.addEventListener(
      "click",
      function (event) {
        event.preventDefault();
        event.stopPropagation();

        closeModal();
      }
    );

    /*
     * Previous
     */
    if (prevBtn) {
      prevBtn.addEventListener(
        "click",
        function (event) {
          event.preventDefault();
          event.stopPropagation();

          previousImage();
        }
      );
    }

    /*
     * Next
     */
    if (nextBtn) {
      nextBtn.addEventListener(
        "click",
        function (event) {
          event.preventDefault();
          event.stopPropagation();

          nextImage();
        }
      );
    }

    /*
     * Click outside modal content
     */
    imageModal.addEventListener(
      "click",
      function (event) {
        if (event.target === imageModal) {
          closeModal();
        }
      }
    );

    /*
     * Keyboard
     */
    document.addEventListener(
      "keydown",
      function (event) {
        if (
          imageModal.classList.contains("hidden")
        ) {
          return;
        }

        if (event.key === "Escape") {
          closeModal();
        }

        if (event.key === "ArrowLeft") {
          previousImage();
        }

        if (event.key === "ArrowRight") {
          nextImage();
        }
      }
    );

    /*
     * Mouse drag
     */
    modalImg.addEventListener(
      "mousedown",
      function (event) {
        if (scale <= 1) return;

        event.preventDefault();

        isDragging = true;

        lastMouse.x = event.clientX;
        lastMouse.y = event.clientY;

        modalImg.classList.add("dragging");
      }
    );

    document.addEventListener(
      "mousemove",
      function (event) {
        if (!isDragging) return;

        const deltaX =
          event.clientX - lastMouse.x;

        const deltaY =
          event.clientY - lastMouse.y;

        position.x += deltaX;
        position.y += deltaY;

        lastMouse.x = event.clientX;
        lastMouse.y = event.clientY;

        applyTransform(false);
      }
    );

    document.addEventListener(
      "mouseup",
      function () {
        if (!isDragging) return;

        isDragging = false;

        modalImg.classList.remove("dragging");

        applyTransform(true);
      }
    );

    /*
     * Double click / double tap zoom
     */
    modalImg.addEventListener(
      "dblclick",
      function (event) {
        event.preventDefault();

        if (scale > 1) {
          scale = 1;
          position.x = 0;
          position.y = 0;
        } else {
          scale = 2;
        }

        applyTransform(true);
      }
    );

    /*
     * Mouse wheel zoom
     */
    modalImg.addEventListener(
      "wheel",
      function (event) {
        event.preventDefault();

        if (event.deltaY < 0) {
          scale = Math.min(
            MAX_SCALE,
            scale + SCALE_STEP
          );
        } else {
          scale = Math.max(
            MIN_SCALE,
            scale - SCALE_STEP
          );
        }

        if (scale === 1) {
          position.x = 0;
          position.y = 0;
        }

        applyTransform(true);
      },
      { passive: false }
    );

    createThumbnails();

    return true;
  }

  /*
   * Social QR menu
   *
   * Capture phase is used so the handler
   * can stop the normal href navigation.
   */
  document.addEventListener(
    "click",
    function (event) {
      const trigger =
        event.target.closest(
          ".qr-open-trigger"
        );

      if (!trigger) return;

      if (
        typeof window.openQrModal ===
        "function"
      ) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();

        window.openQrModal(0);
      }
    },
    true
  );

  /*
   * Initialize after DOM is ready.
   */
  if (
    document.readyState === "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      initQrModal
    );
  } else {
    initQrModal();
  }

})();
