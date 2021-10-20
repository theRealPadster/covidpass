import {useTranslation} from 'next-i18next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';

import Page from '../components/Page'
import Card from '../components/Card'

interface link{
    url: string;
    text: string;
}

function linkToJSX(link: link): JSX.Element {
    return <div style={{ display: 'inline' }} dangerouslySetInnerHTML={{ __html: `<a href="${link.url}" target="_blank" class="underline">${link.text}</a>` }}></div>
}

function urlParse(text: string, links: link[]): JSX.Element[] {
    const el = text.split(/(%s)/).map(s => {
        if (s.includes("%s")) {
            return linkToJSX(links.shift());
        } else {
            return <>{s}</>
        }
    });
    return el;
}


const CONSTANTS = {
    grassrootsEmail: { url: 'mailto:grassroots@vaccine-ontario.ca', text: 'grassroots@vaccine-ontario.ca' },
    verifier: { url: 'https://verifier.vaccine-ontario.ca/', text: 'verifier.vaccine-ontario.ca' },
    twitter: { url: 'https://twitter.com/grassroots_team', text: '@grassroots_team' },
    booking: { url: 'https://vaccine-ontario.ca/', text: 'vaccine-ontario.ca' },
    verifyOntarioApp: { url: 'https://covid-19.ontario.ca/verify', text: 'Verify Ontario app' },
    vaxHunters: { url: 'https://vaccinehunters.ca/', text: 'Vaccine Hunters Canada' },
}

function Faq(): JSX.Element {
    const { t } = useTranslation(['common', 'index', 'faq']);
    const questionList = [
      {key: 1, description: 'Which version of iOS does this support?', answer: 'Importing the new enhanced QR codes into Apple Wallet requires iOS 15+, for everyone else please create Photo cards'},
      {key: 2, description: 'I\'m having issues with adding a Wallet card to my older iPhone', answer: 'Unfortunately, the minimum requirement for importing the new QR code into Apple Wallet is iOS 15, which runs on iPhone 6s and newer devices - you will need to create a Photo card'},
      {key: 3, description: 'Why does my Apple Wallet QR code look so small and/or different from the original?', answer: 'Unfortunately we have no control over how Apple Wallet displays the QR code we give it - and in particular, Apple Wallet on iOS 13 and 14 does not draw these QR codes correctly. This is a known Apple bug and it seems unlikely at this point that they will fix it - we suggest using a Photo pass if you can\'t update to iOS 15 or later'},
      {key: 4, description: "What are the supported browsers?", answer: 'For iPhones, only Safari is supported for importing to your Apple Wallet. For Android, Google Chrome works best. Browsers built internally into mobile apps (e.g. Facebook, Twitter, Instagram) are known to have issues.'},
      {key: 5, description: "How is my private information handled?", answer: 'Your proof-of-vaccination PDF (and most of the information in it) never leaves your device, and does NOT get sent to our server - the only information we send and store is non-personally-identifiable information such as vaccine type, date, and which organization gave you the vaccine. We share your concern about personal data being stored and lost, which is why we chose not to store or send any of it to our servers so there is no chance of it being lost or leaked.'},
      {key: 6, description: "Can I install Google Pay wallet on a Samsung Android phone?", answer: 'YES.'},
      {key: 7, description: 'I have a Red/White OHIP card. Can I still use this tool?', answer: 'Yes you can! Just call the Provincial Vaccine Contact Centre at 1-833-943-3900. The call centre agent can email you a copy of the receipt.'},
      {key: 8, description: 'I do not have a health card. Can I still use this tool?', answer: 'First contact your local public health unit to verify your identity and receive a COVIDcovid ID/Personal Access Code. You can then call the Provincial Vaccine Contact Centre at 1-833-943-3900 to get an email copy of your receipt.'},
      {key: 9, description: 'Why isn\'t the new Apple Wallet pass green/orange?', answer: 'Because we now allow importing of QR codes from many provinces and states, and those provinces and states have different eligibility rules, we can no longer reliably determine who is or is not valid at receipt import time.'},
      {key: 10, description: 'How is the data on my vaccination receipt processed?', answer: 'Inside your local web browser, it checks the uploaded PDF or image for a valid QR code. If present, the QR code is converted and either added to Apple Wallet or created as a photo depending on the option you choose.'},
      {key: 11, description: 'How can organizations validate this QR code?', answer: urlParse('The %s is the verification application for the new official Ontario QR codes.',[CONSTANTS.verifyOntarioApp])},
      {key: 12, description: 'Can I use the same mobile wallet to store passes for my entire family?', answer: 'Yes. You can save multiple Wallet or Photo cards on your device without issues.'},
      {key: 13, description: 'Is this free and non-commercial?', answer: urlParse('Similar to %s, there are no commercial interests. Just volunteers trying to do our part to help the community.',[CONSTANTS.vaxHunters])},
      {key: 14, description: 'How about support for other provinces or US states?', answer: urlParse('We now have support for Ontario, British Columbia, Québec, Alberta, Saskatchewan, Nova Scotia, Yukon, Northwest Territories, California, New York, New Jersey, Louisiana, Hawaii, Virginia, and Utah QR codes. If you have a QR code that is not currently supported by our app, please contact us at %s', [CONSTANTS.grassrootsEmail])},
      {key: 15, description: 'How about Apple Watch?', answer: 'If you have iCloud sync enabled, you will see the pass on the watch too. Please be aware though that the new QR codes may be too large to display accurately on older Apple Watches due to their screen size.'},
      {key: 16, description: 'Why have we taken time to build this?', answer: 'We wanted to give people across Canada the ability to conveniently and securely add their vaccination QR code to their mobile devices to make it easier to present them, and also wanted to create a verifier tool which requires no app install and is convenient for anyone to use from a web browser on any device with a camera.'},
      {key: 17, description: 'Who made this?', answer: urlParse('The same group of volunteers who created the all-in-one vaccine appointment finding tool at %s', [CONSTANTS.booking])},
      {key: 18, description: 'How can I stay up-to-date on your progress?', answer: urlParse('We will post regular updates on Twitter %s', [CONSTANTS.twitter])},
      {key: 19, description: 'I have more questions. Can you please help me?', answer: urlParse('Sure. Just email us at %s', [CONSTANTS.grassrootsEmail]) }
    ];

    return (
        <Page content={
            <Card step="?" heading={t('common:faq')} content={
                <div className="space-y-3">
                    <p className="font-bold">{t('faq:heading')}</p>
                    <ol>
                        {questionList.map((question, i) => {
                        return (
                            <div>
                                <li key={i}><b>{i+1}. {question.description}</b></li>
                                <li key={i}>{question.answer}</li>
                                <br></br>
                            </div>
                        );
                        })}
                    </ol>

                </div>
            }/>
        }/>
    )
}

export async function getStaticProps({ locale }) {
    return { 
        props: { 
            ...(await serverSideTranslations(locale, ['index', 'faq', 'common']))
        }
    }
}

export default Faq;