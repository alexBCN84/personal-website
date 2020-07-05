import React, { useContext } from 'react';
import { store } from '@data-management/store';
import { SET_ACTIVE_LANGUAGE } from '@data-management/actions'
import * as St from './styles';
import Img from 'gatsby-image';
import { useDevice } from "react-use-device";
import CVButton from './cvButton';
import { scrollTo } from '@utils/index';

export const PureHeroBanner = () => {
  const globalState = useContext(store);
  const { dispatch, heroBannerData, state } = globalState;
  const [inVewport, setInViewPort] = React.useState(null);
  const sectionRef = React.useRef(null);
  const SwitchLanguageButtonRef = React.useRef(null);
  const { logo, headline, kicker, description, cvCTA, about } = heroBannerData;
  const { languages } = state;

  React.useEffect(() => {

    const fixedPosition = 'fixed';
    const relativePosition = 'relative';
    if (sectionRef.current) {
      setInViewPort(true);
      SwitchLanguageButtonRef.current.style.position = fixedPosition;
    }

    function toggleLanguageButtonPosition(entries) {
      // check if section is on view and is intersecting
      if (!entries[0].isIntersecting && !entries[0].isVisible) {
        SwitchLanguageButtonRef.current.style.position = relativePosition;
      } else {
        SwitchLanguageButtonRef.current.style.position = fixedPosition;
      }
    }

    // user rootMargin from options object to set the new point where you want intersection to happen
    const sectionObserver = new IntersectionObserver(toggleLanguageButtonPosition, { rootMargin: '-100px' });
    sectionObserver.observe(sectionRef.current);

    return () => {
      sectionObserver.disconnect();
    };
  });

  function changeLanguage() {
    dispatch({type: SET_ACTIVE_LANGUAGE, languages: {active: languages.inactive, inactive: languages.active}});
  }

  const { isMOBILE, isTABLET, isLAPTOP, isDESKTOP } = useDevice();
  const mobileHeroBanner = (
    <div data-testid="mobile">
      <St.Wrapper ref={sectionRef}>
        <St.TeaserMobile>
          <St.LogoWrapperMobile>
            <Img fixed={logo} className="logo" alt="logo" />
            <St.LogoTextWrapperMobile>
              <St.NameMobile>Alejandro Ginés</St.NameMobile>
              <St.TitleMobile>Web Developer</St.TitleMobile>
            </St.LogoTextWrapperMobile>
          </St.LogoWrapperMobile>
          <CVButton href={cvCTA.href} >{cvCTA.text}</CVButton>
          <St.SwitchLanguageButtonMobile
            id="language-switch"
            ref={SwitchLanguageButtonRef}
            onClick={changeLanguage}
          >
            {languages.inactive}
          </St.SwitchLanguageButtonMobile>
          <St.TeaserChevronContentMobile href="#about" onClick={ 
            () => scrollTo(document.getElementById('about'), 275, 'top') 
          }>
            <St.AboutUsText>{about}</St.AboutUsText>
            <St.ScrollDownBtn />
          </St.TeaserChevronContentMobile>
        </St.TeaserMobile>
      </St.Wrapper>
      <St.BannerContentMobile id="about">
        <St.KickerMobile>{kicker}</St.KickerMobile>
        <St.HeadlineMobile>{headline}</St.HeadlineMobile>
        <St.DescriptionMobile>{description}</St.DescriptionMobile>
      </St.BannerContentMobile>
    </div>
  );

  const tabletHeroBanner = (
  <div data-testid="tablet">
    <St.Wrapper ref={sectionRef}>
      <St.TeaserMobile>
        <St.LogoWrapperMobile>
          <Img fixed={logo} className="logo" alt="logo" />
          <St.LogoTextWrapper>
            <St.Name>Alejandro Ginés</St.Name>
            <St.Title>Web Developer</St.Title>
          </St.LogoTextWrapper>
        </St.LogoWrapperMobile>
        <CVButton href={cvCTA.href} >{cvCTA.text}</CVButton>
        <St.SwitchLanguageButton
          id="language-switch"
          ref={SwitchLanguageButtonRef}
          onClick={changeLanguage}
        >
          {languages.inactive}
        </St.SwitchLanguageButton>
        <St.TeaserChevronContentMobile href="#about" onClick={ 
          () => scrollTo(document.getElementById('about'), 275, 'top') 
        }>
          <St.AboutUsTextTablet>{about}</St.AboutUsTextTablet>
          <St.ScrollDownBtn />
        </St.TeaserChevronContentMobile>
      </St.TeaserMobile>
    </St.Wrapper>
    <St.BannerContentMobile id="about">
      <St.KickerTablet>{kicker}</St.KickerTablet>
      <St.HeadlineTablet>{headline}</St.HeadlineTablet>
      <St.DescriptionTablet>{description}</St.DescriptionTablet>
    </St.BannerContentMobile>
  </div>
  );

  const desktopHeroBanner = (
    <St.Wrapper ref={sectionRef} data-testid="desktop">
      <St.Teaser>
        <St.LogoWrapper>
          <Img fixed={logo} className="logo" alt="logo" />
          <St.LogoTextWrapper>
            <St.Name>Alejandro Ginés</St.Name>
            <St.Title>Web Developer</St.Title>
          </St.LogoTextWrapper>
        </St.LogoWrapper>
        <St.TeaserChevronContent href="about">
          <St.AboutUsText>{about}</St.AboutUsText>
          <St.ScrollDownBtn />
        </St.TeaserChevronContent>
      </St.Teaser>
      <St.BannerContent>
        <St.SwitchLanguageButton
          id="language-switch"
          ref={SwitchLanguageButtonRef}
          onClick={changeLanguage}
        >
          {languages.inactive}
        </St.SwitchLanguageButton>
        <St.CopyWrapper>
          <St.Kicker>{kicker}</St.Kicker>
          <St.Headline>{headline}</St.Headline>
          <St.Description>{description}</St.Description>
          <CVButton href={cvCTA.href}>{cvCTA.text}</CVButton>
        </St.CopyWrapper>
      </St.BannerContent>
      </St.Wrapper>
  );

  return (
    <>
      {isMOBILE && mobileHeroBanner}
      {isTABLET && tabletHeroBanner}
      {(isLAPTOP || isDESKTOP) && desktopHeroBanner}
    </>
  )
};

export const HeroBanner = props => {
  return <PureHeroBanner {...props} />

}