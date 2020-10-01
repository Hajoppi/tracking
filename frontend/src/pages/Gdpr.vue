<template>
  <div class="gdpr-toc">
    <div class="select-btn">
      <button
        @click="showGDPR = false"
        class="btn-underline"
        :class="{ active: !showGDPR }"
      >
        <p>Terms and Conditions</p>
      </button>
      <button
        @click="showGDPR = true"
        class="btn-underline"
        :class="{ active: showGDPR }"
      >
        <p>Privacy Policy</p>
      </button>
    </div>
    <div class="text" :class="{ hidden: showGDPR }">
      <p>
        This app allows you to post link, store, share and otherwise make
        available certain information, text, graphics, videos or other content.
        You are responsible for the content that you post to the service,
        including its legality, reliability and appropriateness.
      </p>
      <p>
        By posting content to the service you grant us the right and license to
        use, modify, publicly perform, publicly display, reproduce and
        distribute such content on and through the service.<br /><br />
        You retain any and all of your rights to any Content you submit, post or
        display on or through the service and you are responsible for protecting
        those rights.
      </p>
      <p>
        You agree that this license includes the right for us to make your
        content available to other users of the service who may also use your
        content subject to these terms.
      </p>
      <p>
        You represent and warrant that: (i) the content is yours or that you
        have the right to use it and grant us the rights and license as provided
        in these terms and (ii) the posting of your content on or through the
        service does not violate the privacy rights, publicity rights,
        copyrights, contract rights or any other rights of any person. iii) the
        content does not contain any alcoholic or tobacco products, drugs, guns
        or advertisement of payday loans, gambling or direct soft drink
        advertisement for children.
      </p>
      <p>
        If you violate any of these conditions, we reserve the right to remove
        your content from the application, restrict your usage of the
        application and use your email address to contact you upon these issues.
      </p>
    </div>
    <div class="text" :class="{ hidden: !showGDPR }">
      <p>
        This privacy statement complies with the EU General Data Protection
        Regulation (GDPR).<br />
        Creation date 5th of January 2020, latest update 5th of January 2020.
      </p>
      <h5>1. Controller of the register</h5>
      <p>Aalto Yliopiston Ylioppilaskunta (AYY) Otakaari 11, 02150 Espoo</p>
      <h5>2. Person in charge of the register</h5>
      <p>Anna Anttalainen Anna.anttalainen (at) ayy.fi</p>
      <h5>3. Name of the register</h5>
      <p>All to X user register</p>
      <h5>4. Legal basis and the purpose of gathering personal information</h5>
      <p>
        The legal basis for gathering personal information, complying with the
        EU GDPR, is the legitimate interest of the controller of the register.
        The purpose of gathering personal information is the maintenance of the
        service, and keeping the user information up to date.
      </p>
      <p>
        We use Google Analytics for aggregated, anonymized website traffic
        analysis. In order to track session usage, GA drops a cookie (_ga) with
        a randomly-generated ClientID in the user's browser. This ID is
        anonymized and contains no identifiable information like email, phone
        number, name, etc. We also anonymize the user's IP-address. We use GA to
        track the user's All To X website behaviour, such as what pages the user
        looked at, for how long, and so on. This information is important to us
        for improving the user experience and determining site effectiveness. We
        store no identifiable information about your visits to GA.
      </p>
      <h5>5. Information in the register</h5>
      <p>The register will contain the following information:</p>
      <ul>
        <li>Username</li>
        <li>Email address</li>
        <li>User associations</li>
        <li>User activity in the application</li>
      </ul>
      <p>
        The register does not contain information of people who are not using
        the service.
      </p>
      <h5>6. Regular sources of information</h5>
      <p>
        TThe information in the register comes from users who join or have
        already joined the service and their activity in the service.
      </p>
      <h5>
        7. Handing over information and transferring information outside of the
        EU or the EEA
      </h5>
      <p>
        The information in this register is not to be handed over to outside
        parties. The information is not to be handed over or stored outside the
        European Union or the European Economic Area.
      </p>
      <h5>8. Principles of protecting the register</h5>
      <p>
        The register is handled carefully. The information is stored only in
        electronic format, in a trustworthy server operated by a third party,
        which complies with the EU GDPR. The encryption of the register is done
        using AYY’s own encryption keys. The information is only available to
        authorized persons of the AYY. The controller of the register will
        ensure that access to the register is only limited to the appropriate
        individuals.
      </p>
      <h5>9. Right to check and request for corrections in the information</h5>
      <p>
        Each user who is in the register has the right to check their
        information that has been saved in the register and demand for
        corrections if any information is incorrect or missing. If the person
        wishes to see the information the register has on them or requests for a
        correction, the request must be sent to the controller of the register
        in writing.<br /><br />
        The controller of the register can ask the sender of the request to
        verify their identity. The controller of the register will answer the
        requesting party within the time limit specified by the GDPR (primarily
        within one month).
      </p>
      <h5>10. Retention period of the information in the register</h5>
      <p>
        The register shall contain information only of people who are using the
        service. Persons who quit or are expelled from the service will have
        their information removed from the register within a reasonable
        timeframe, at most within one month from the decision of expulsion or
        quitting.
      </p>
    </div>
  </div>
</template>

<script>
/* ============
 * Home Index Page
 * ============
 *
 * The home index page.
 */

export default {
  /**
   * The name of the page.
   */
  name: 'gdpr-index',

  data() {
    return {
      showGDPR: false,
    };
  },

  components: {},
  methods: {},
};
</script>
