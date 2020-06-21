import React from 'react';
import PropTypes from 'prop-types';

import { graphql, useStaticQuery } from 'gatsby';
import * as St from './styles';
import Img from 'gatsby-image';
import { useDevice } from "react-use-device";
import CVButton from './cvButton';
import { scrollTo } from '../../../utils';

export const HeroBanner = ({ languages, setLanguage }) => {
  const [inVewport, setInViewPort] = React.useState(null);
  const sectionRef = React.useRef(null);
  const SwitchLanguageButtonRef = React.useRef(null);

  React.useEffect(() => {
    if (sectionRef.current) setInViewPort(true);
    const fixedPosition = 'fixed';
    const relativePosition = 'relative';

    SwitchLanguageButtonRef.current.style.position = fixedPosition;

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
  }, [inVewport, setInViewPort]);

  const { isMOBILE, isTABLET, isLAPTOP, isDESKTOP } = useDevice();
  const data = useStaticQuery(
    graphql`
      query {
        file(relativePath: { eq: "logo.png" }) {
          childImageSharp {
            fixed(width: 40, height: 40) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        allDataJson {
          edges {
            node {
              ES {
                kicker
                headline
                description
                aboutChevronText
                cvCTA {
                  text
                  href
                }
              }
              EN {
                kicker
                headline
                description
                aboutChevronText
                cvCTA {
                  text
                  href
                }
              }
            }
          }
        }
      }
    `
  );

  const { headline, kicker, description, cvCTA, aboutChevronText: about } = data.allDataJson.edges[0].node[
    languages.active
  ];

  const mobileHeroBanner = (
    <>
      <St.Wrapper ref={sectionRef}>
        <St.TeaserMobile>
          <St.LogoWrapperMobile>
            <Img fixed={data.file.childImageSharp.fixed} className="logo" alt="logo" />
            <St.LogoTextWrapperMobile>
              <St.NameMobile>Alejandro Ginés</St.NameMobile>
              <St.TitleMobile>Web Developer</St.TitleMobile>
            </St.LogoTextWrapperMobile>
          </St.LogoWrapperMobile>
          <CVButton href={cvCTA.href} >{cvCTA.text}</CVButton>
          <St.SwitchLanguageButtonMobile
            ref={SwitchLanguageButtonRef}
            onClick={() => {
              const { inactive } = languages;
              const { active } = languages;
              setLanguage({ active: inactive, inactive: active });
            }}
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
    </>
  );

  const tabletHeroBanner = <p>Tablet Hero Banner</p>;

  const laptopHeroBanner = <p>Laptop Hero Banner</p>;

  const desktopHeroBanner = (
    <St.Wrapper ref={sectionRef}>
      <St.Teaser>
        <St.LogoWrapper>
          <Img fixed={data.file.childImageSharp.fixed} className="logo" alt="logo" />
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
          ref={SwitchLanguageButtonRef}
          onClick={() => {
            const { inactive } = languages;
            const { active } = languages;
            setLanguage({ active: inactive, inactive: active });
          }}
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
      {isLAPTOP && laptopHeroBanner}
      {isDESKTOP && desktopHeroBanner}
    </>
  )
};

HeroBanner.propTypes = {
  languages: PropTypes.shape({
    active: PropTypes.oneOf(['ES', 'EN']),
    inactive: PropTypes.oneOf(['ES', 'EN']),
  }).isRequired,
  setLanguage: PropTypes.func.isRequired,
};
