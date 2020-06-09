<template>
<footer class="site-footer footer">
  <ul class="footer__legal_list">
    <li class="footer__legal_item tnf-logo">
      <g-link to="/">
        <img
          class="footer__logo_img"
          src="~/assets/images/tnf-logo.svg"
          svg-inline
        />
      </g-link>
    </li>
    <li class="footer__legal_item">
      <a href="#" class="footer__legal_link">PRIVACY POLICY</a>
    </li>
    <li class="footer__legal_item">
      <a href="#" class="footer__legal_link">TERMS OF USE</a>
    </li>
  </ul>

  <ul class="footer__social_list">
      <li class="footer__social_item">
        <a
          href="#"
          class="footer__social_link"
          target="_blank"
          rel="noreferrer noopener"
        >
          <img
            class="footer__social_logo instagram"
            src="~/assets/images/instagram-logo.svg"
            svg-inline
          />
        </a>
      </li>
      <li class="footer__social_item">
        <a
          href="#"
          class="footer__social_link"
          target="_blank"
          rel="noreferrer noopener"
        >
          <img
            class="footer__social_logo spotify"
            src="~/assets/images/spotify-logo.svg"
            svg-inline
          />
        </a>
      </li>
      <li class="footer__social_item">
        <a
          href="#"
          class="footer__social_link"
          target="_blank"
          rel="noreferrer noopener"
        >
          <img
            class="footer__social_logo youtube"
            src="~/assets/images/youtube-logo.svg"
            svg-inline
          />
        </a>
      </li>
    </ul>
</footer>
</template>

<script>
export default {
  name: "footerNav",
}
</script>