<div aria-hidden='true' class='image-modal hidden' id='imageModal'>

  <!--CLOSE-->

  <button aria-label='Close' class='close-btn' id='closeBtn' type='button'>
    &#215;
  </button>


  <!--MODAL CONTENT-->

  <div aria-label='Image gallery' aria-modal='true' class='modal-content' role='dialog'>


    <!--MAIN IMAGE-->

    <div class='image-container' id='imageContainer'>

      <button aria-label='Previous image' class='prev-btn' id='prevBtn' type='button'>
        &#10094;
      </button>


      <img alt='' class='modal-img' draggable='false' id='modalImg' src='' title=''/>


      <div class='modal-title' id='modalTitle'/>


      <button aria-label='Next image' class='next-btn' id='nextBtn' type='button'>
        &#10095;
      </button>

    </div>


    <!--THUMBNAILS-->

    <div aria-label='Image thumbnails' class='modal-thumbs' id='modalThumbs' role='list'/>


    <!--BOOK NOW-->

    <a class='ota-button' href='#' id='bookNow' rel='noopener noreferrer' style='display: none;' target='_blank'>
      Book Now
    </a>

  </div>

</div>

<script>
(function () {
  &quot;use strict&quot;;

  const images = [
    {
      src: &quot;https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi-68yXhw3S2e0RRbFo1OPD1sbRgfLwZnMr-KYyw-b7IUyYfdXRCbYr1DVeDETN-o4PzEd7gtC7La_RF6sv4t0ycrMI6ZyRpCuDU4a_u7yhGcpUp_y1U_gXrVRDw-6sdBk4kNZDZIbXVR4cc94IQiQaUYqvR6E0o1D2XBf0sxuiwSM7zFKK0aA7IlC7pyte/w259-h320/Qr-Kakaotalk-Pointbookingofficial.png&quot;,
      alt: &quot;KakaoTalk | pointbookingofficial | +84 905-926-803&quot;,
      title: &quot;KakaoTalk QR Code | pointbookingofficial | +84 905-926-803&quot;,
      url: &quot;https://pointbookingofficial.com/&quot;
    },
    {
      src: &quot;https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgfLxmHY1bIhU8TKf97G4b8xSO9n62F2LobFQfcFd1LzYMn-XMXC8Oz_JBeK71E6xl-tMd9tkv6IGgxnkrvsQ-vRG5Ii4KeA_5cFiQgYMgsYUllmqNL69tUG3WgX48osr-bNJxBsgM326dzGP91HlII5zporU6bczSv1jrbVBCmdGi0EYTt6MGqsHmLaRD1/w267-h320/Qr-Wechat-Pointbookingofficial.png&quot;,
      alt: &quot;WeChat QR Code | +84 905-926-803&quot;,
      title: &quot;WeChat QR Code | +84 905-926-803&quot;,
      url: &quot;https://pointbookingofficial.com/&quot;
    },
    {
      src: &quot;https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiiNLZ8hQp7hYruI3kQBrK9PjJxiWE248j7Es7pCsxjwwCZ_K3ZHZK4IcokcLbut9Wpvz7RwGTgqSMqsk-eupxk5jG4D9a7c9Sc-exvOxS2urSNB_BQluzf0JucGag6EMCRxXMFrByAHollri1W1nzp3p9CmgXjoRB9WRKG-eC6PAeVgMN_7cSVempgmUni/w323-h306/Qr-Line-Pointbookingofficial.png&quot;,
      alt: &quot;Line QR Code | +84 905-926-803&quot;,
      title: &quot;Line QR Code | +84 905-926-803&quot;,
      url: &quot;https://pointbookingofficial.com/&quot;
    },
    {
      src: &quot;https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiYVNuczDfx_V7YM0dXYjV07xbqmu9-iG8l24yr5YKewFKjb03TihX6_fNbmia3Thyb9U3P5BHeEVrekb1D1BAiY9M8T65syiR3kj2xSB_Y867d24dvJM_gXZg3gleYCusOwvm_fZU7qbKDgqXVNtrIbUvnG4Jt86E_Ovil5ntwEyjmoNiTqoJ6E9VWgcv_/w236-h320/Qr-Telegram-Pointbookingofficial.png&quot;,
      alt: &quot;Telegram QR Code | @pointbookingofficial&quot;,
      title: &quot;Telegram QR Code | @pointbookingofficial&quot;,
      url: &quot;https://pointbookingofficial.com/&quot;
    },
    {
      src: &quot;https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiF7RI0BvlVw0_5t1sFEpThsvPIQiv0fHAnoV0bAyb13vPRdL1gU1QXuDpsiLxu4_8Cc8MWvkQZoMApLPaIYVgxEPHGgIHHooIFmXsOoGSMClff3lZd-igZsyC0_FYiYPsEBRm13KW9__JEKvR8mq7pFZXHTR8addKC0eK2g0bXlBgV_ClnYbLnVilDin_-/w244-h320/Qr-Zalo-Pointbookingofficial.png&quot;,
      alt: &quot;Zalo QR Code | Point Booking&quot;,
      title: &quot;Zalo QR Code | Point Booking&quot;,
      url: &quot;https://pointbookingofficial.com/&quot;
    }
  ];

  document.addEventListener(&quot;DOMContentLoaded&quot;, function () {
    const imageModal = document.getElementById(&quot;imageModal&quot;);
    const imageContainer = document.getElementById(&quot;imageContainer&quot;);
    const modalImg = document.getElementById(&quot;modalImg&quot;);
    const modalTitle = document.getElementById(&quot;modalTitle&quot;);
    const modalThumbs = document.getElementById(&quot;modalThumbs&quot;);
    const closeBtn = document.getElementById(&quot;closeBtn&quot;);
    const prevBtn = document.getElementById(&quot;prevBtn&quot;);
    const nextBtn = document.getElementById(&quot;nextBtn&quot;);
    const bookNow = document.getElementById(&quot;bookNow&quot;);

    if (!imageModal || !modalImg || !closeBtn) {
      console.warn(&quot;QR Modal HTML chưa có trên trang này&quot;);
      return;
    }

    let selectedIndex = 0;
    let scale = 1;
    const MIN_SCALE = 1, MAX_SCALE = 4, SCALE_STEP = 0.2;
    let position = { x: 0, y: 0 };
    let isDragging = false;
    let lastMouse = { x: 0, y: 0 };
    let touchStartX = 0, touchStartY = 0, lastTap = 0, pinchDistance = null;

    function clamp(v, min, max) { return Math.min(Math.max(v, min), max); }

    function getImageBounds() {
      const cw = imageContainer.clientWidth, ch = imageContainer.clientHeight;
      const nw = modalImg.naturalWidth, nh = modalImg.naturalHeight;
      if (!nw || !nh) return { maxX: 0, maxY: 0 };
      const ratio = Math.min(cw / nw, ch / nh);
      const dw = nw * ratio * scale, dh = nh * ratio * scale;
      return { maxX: Math.max(0, (dw - cw) / 2), maxY: Math.max(0, (dh - ch) / 2) };
    }

    function applyTransform(animate = true) {
      const b = getImageBounds();
      position.x = clamp(position.x, -b.maxX, b.maxX);
      position.y = clamp(position.y, -b.maxY, b.maxY);
      modalImg.style.transition = animate ? &quot;transform 0.3s ease&quot; : &quot;none&quot;;
      modalImg.style.transform = `translate(${position.x}px, ${position.y}px) scale(${scale})`;
      modalImg.classList.toggle(&quot;zoomed&quot;, scale &gt; 1);
    }

    function resetZoom() {
      scale = 1; position.x = 0; position.y = 0; isDragging = false;
      modalImg.classList.remove(&quot;dragging&quot;);
      applyTransform();
    }

    function setImage(index) {
      selectedIndex = (index + images.length) % images.length;
      const img = images[selectedIndex];
      modalImg.src = img.src; modalImg.alt = img.alt; modalImg.title = img.title;
      if (modalTitle) modalTitle.textContent = img.title;
      if (bookNow) bookNow.href = img.url || &quot;#&quot;;
      resetZoom();
      updateThumbnails();
    }

    function createThumbnails() {
      if (!modalThumbs) return;
      modalThumbs.innerHTML = &quot;&quot;;
      images.forEach((image, index) =&gt; {
        const thumb = document.createElement(&quot;img&quot;);
        thumb.className = &quot;thumb&quot;; thumb.src = image.src; thumb.alt = image.alt;
        thumb.addEventListener(&quot;click&quot;, function (e) { e.stopPropagation(); setImage(index); });
        modalThumbs.appendChild(thumb);
      });
    }

    function updateThumbnails() {
      if (!modalThumbs) return;
      const thumbs = modalThumbs.querySelectorAll(&quot;.thumb&quot;);
      thumbs.forEach((t, i) =&gt; t.classList.toggle(&quot;active&quot;, i === selectedIndex));
    }

    function nextImage() { setImage(selectedIndex + 1); }
    function previousImage() { setImage(selectedIndex - 1); }

    function openModal(index = 0) {
      setImage(index);
      imageModal.classList.remove(&quot;hidden&quot;);
      imageModal.setAttribute(&quot;aria-hidden&quot;, &quot;false&quot;);
      document.body.style.overflow = &quot;hidden&quot;;
    }

    function closeModal() {
      imageModal.classList.add(&quot;hidden&quot;);
      imageModal.setAttribute(&quot;aria-hidden&quot;, &quot;true&quot;);
      document.body.style.overflow = &quot;&quot;;
      resetZoom();
    }

    /* QUAN TRỌNG: đưa openModal ra window để đoạn code
       gắn ở nút menu (nằm ngoài scope này) gọi được */
    window.openQrModal = openModal;

    /* ===== CÁC SỰ KIỆN MODAL ===== */
    closeBtn.addEventListener(&quot;click&quot;, (e) =&gt; { e.stopPropagation(); closeModal(); });
    if (prevBtn) prevBtn.addEventListener(&quot;click&quot;, (e) =&gt; { e.stopPropagation(); previousImage(); });
    if (nextBtn) nextBtn.addEventListener(&quot;click&quot;, (e) =&gt; { e.stopPropagation(); nextImage(); });
    imageModal.addEventListener(&quot;click&quot;, (e) =&gt; { if (e.target === imageModal) closeModal(); });
    document.addEventListener(&quot;keydown&quot;, (e) =&gt; {
      if (imageModal.classList.contains(&quot;hidden&quot;)) return;
      if (e.key === &quot;Escape&quot;) closeModal();
      if (e.key === &quot;ArrowLeft&quot;) previousImage();
      if (e.key === &quot;ArrowRight&quot;) nextImage();
    });

    createThumbnails();

  }); // 

  /* =========================================================
     BẮT CLICK NÚT SOCIAL QR TRONG MENU
     (đặt ngoài DOMContentLoaded callback ở trên, nhưng vẫn
      trong IIFE &#8212; dùng capture phase để chắc chắn bắt được
      trước khi trình duyệt điều hướng)
  ========================================================= */
  document.addEventListener(&quot;click&quot;, function (e) {
    const trigger = e.target.closest(&quot;.qr-open-trigger&quot;);
    if (!trigger) return;

    if (typeof window.openQrModal === &quot;function&quot;) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      window.openQrModal(0);
    }
    // Nếu window.openQrModal chưa sẵn sàng (modal HTML chưa có trên trang)
    // thì để trình duyệt chuyển trang bình thường như link dự phòng.
  }, true);

})(); // 
</script>
