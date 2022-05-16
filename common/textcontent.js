import React from 'react';
import {Text} from 'react-native';
import CommonStyles from '../common/commonstyles';

export const BornText = () => {
  return (
    <Text style={CommonStyles.subheaderleft}>Enter your date of birth</Text>
  );
};

export const Dependatnts = () => {
  return (
    <Text style={CommonStyles.subheaderleft}>Do you have Dependants?</Text>
  );
};

export const BreakDown = () => {
  return <Text style={CommonStyles.subheaderleft}>Monthly Cost BreakDown</Text>;
};

export const Summary = () => {
  return <Text style={CommonStyles.infoheader}>Summary</Text>;
};
export const PrimaryCareSummary = () => {
  return (
    <Text style={CommonStyles.textstyle}>
      A 2 month genearl waiting period, no pre-existing conditions exclusions.
      {'\n'}
      {'\n'}A 12 month waiting period for chronic medication and optometry and a
      9 month waiting period for pre-birth maternity.{'\n'}
      {'\n'}
      Note: This is not a medical scheme and the cover is not the same as that
      of a medical scheme.{'\n'} This policy is not a substitute for medical
      scheme membership
    </Text>
  );
};

export const GPHeader = () => {
  return (
    <Text style={CommonStyles.infoheader}>
      {' '}
      GP Consultations{'\n'} Unlimited
    </Text>
  );
};
export const GPConsultation = () => {
  return (
    <Text style={CommonStyles.subheaderleft}>
      PLAN C: Unlimited consultations at a Unity Health network doctor.{'\n'}
      Pre-authorisation is required for 10 or more visits to a GP, Nurse or
      Telemedicine consultations.{'\n'}
      {'\n'}
      We have over 3 500 Unity Health network doctors nationwide. For your
      nearest network doctor call our Call Centre on 0861 366 006 or search for
      a network doctor on your Unity Health App or on our website by logging
      into your member portal.
    </Text>
  );
};

export const GPProHeader = () => {
  return <Text style={CommonStyles.infoheader}> GP Procedures</Text>;
};
export const GPProcedures = () => {
  return (
    <Text style={CommonStyles.subheaderleft}>
      Minor procedures in rooms are included in your visits to the doctor.{'\n'}
      E.g. Stitching of a wound, circumcision, applying a cast to a broken arm.
    </Text>
  );
};

export const NurseHeader = () => {
  return <Text style={CommonStyles.infoheader}>Nurse Consultations</Text>;
};
export const NurseConsultation = () => {
  return (
    <Text style={CommonStyles.subheaderleft}>
      Unlimited consultations available at approved pharmacies (Alpha Pharm,
      Clicks, Dischem, Local Choice, Medicare or Pick n Pay pharmacy) for minor
      ailments.{'\n'}
      {'\n'}
      Pre-authorisation is required for 10 or more visits to a GP, Nurse or
      Telemedicine consultations.{'\n'}
      {'\n'}
      In many practices, nurses can provide scripts for minor ailments for up to
      schedule 2 medications. Virtual GP consultations are available through
      approved pharmacies that have a nurse clinic (Dischem and Medicare).
    </Text>
  );
};

export const TeleMedicineHeader = () => {
  return (
    <Text style={CommonStyles.infoheader}>TeleMedicine Consultations</Text>
  );
};
export const TelemedicineConsultation = () => {
  return (
    <Text style={CommonStyles.subheaderleft}>
      Unlimited virtual GP consultations are available through approved
      pharmacies that have a nurse clinic (Alpha pharm, Dischem and Medicare).
      {'\n'}
      {'\n'} If the nurse believes a virtual GP consultation is necessary, The
      nurse will facilitate the GP consultation through a video conference link.
      {'\n'}
      {'\n'}
      Pre-authorisation is required for 10 or more visits to a GP, Nurse or
      Telemedicine consultations.
    </Text>
  );
};

export const SpecialistHeader = () => {
  return (
    <Text style={CommonStyles.infoheader}>
      Specialist Consultations{'\n'} Limited
    </Text>
  );
};
export const SpecialistConsultation = () => {
  return (
    <Text style={CommonStyles.subheaderleft}>
      Limited to R1275 per visit with an overall annual limit of R2650 per
      family member. {'\n'} {'\n'} Referal by Unity Health Network GP and
      pre-authorisation requierd.
    </Text>
  );
};

export const AcuteHeader = () => {
  return <Text style={CommonStyles.infoheader}>Acute Medication</Text>;
};
export const AcuteMedication = () => {
  return (
    <Text style={CommonStyles.subheaderleft}>
      Dispensing doctor{'\n'} {'\n'}
      If your Doctor dispenses medication, you will receive your medication
      during your visit.{'\n'}
      Non-dispensing doctor{'\n'} {'\n'}A non-dispensing GP will provide you
      with a prescription to collect your medication at your nearest network
      pharmacy. Medication is covered according to a set formulary.{'\n'} {'\n'}
      Prescribed medication is unlimited{'\n'} {'\n'}
      This is limited to medication prescribed during the GP visits. All acute
      medication is subject to a formulary.
    </Text>
  );
};

export const ChronicHeader = () => {
  return <Text style={CommonStyles.infoheader}>Chronic Medication</Text>;
};
export const ChronicMedication = () => {
  return (
    <Text style={CommonStyles.subheaderleft}>
      Chronic Medication Programme. 8 listed chronic conditions and HIV/AIDS
      included.{'\n'}
      {'\n'}
      What is a chronic condition?{'\n'}A condition or disease that lasts for an
      extended period of time. Chronic diseases include asthma, hypertension,
      diabetes and HIV/AIDS.{'\n'} For a list of chronic conditions covered,
      please call the Unity Health Call Centre on 0861 366 006 or visit www.
      unityhealth.co.za{'\n'}
      {'\n'}
      How does the Chronic Medication Programme work?{'\n'}
      Your network doctor will assist you to register on the Chronic Medication
      Programme with Mediscor. Your doctor will prescribe medicine for you
      according to a set formulary. The chronic medication formulary can be
      found on Mediscor’s website: www.mediscor.co.za.{'\n'}
      {'\n'}
      How can you collect your chronic medication?{'\n'}
      When you are approved and registered to receive chronic medication to
      treat your condition MEDIPOST will contact you telephonically to arrange a
      delivery date and your preferred collection point. Deliveries are managed
      by MediLogistics and can be done at the following points – your home
      address, your place of work or your providers’ practice.{'\n'}
      {'\n'} You may still continue to collect your medication at your network
      pharmacy if you prefer to do so.
    </Text>
  );
};

export const EmergencyDentist = () => {
  return (
    <Text style={CommonStyles.infoheader}>
      Basic and Emergency{'\n'} Dentistry Treatment{'\n'} Limited
    </Text>
  );
};
export const DentistryTreatment = () => {
  return (
    <Text style={CommonStyles.subheaderleft}>
      Limited to R1 350 per person per incident.{'\n'}
      {'\n'}
      Treatment includes: full mouth assessment, intraoral radiographs, scale
      and polish, extractions, emergency root canal, fillings, pain and sepsis
      treatment.{'\n'} Specialised dentistry (such as bridges or crowns) is not
      covered. Orthodontic treatment (such as braces or dentures) is also not
      covered. Pre-authorisation is required for all dental fillings.{'\n'}
      {'\n'}
      To book an appointment with a dentist, please call the Unity Health Call
      Centre on 0861 366 006.
    </Text>
  );
};

export const Optometry = () => {
  return <Text style={CommonStyles.infoheader}>Optometry{'\n'} Limited</Text>;
};
export const OptometryLimited = () => {
  return (
    <Text style={CommonStyles.subheaderleft}>
      One eye test and a standard frame to the value of R254 per person per 24
      months.{'\n'}
      {'\n'}
      One pair of clear standard spectacle lenses per person per 24 months.
      {'\n'}
      {'\n'}
      Available at a PPN network optometrist. For a network optometrist near
      you, please call the Unity Health Call Centre on 0861 366 006 or visit
      www.ppn.co.za
    </Text>
  );
};

export const Radiology = () => {
  return <Text style={CommonStyles.infoheader}>Radiology{'\n'} Limited</Text>;
};
export const RadiologyLimited = () => {
  return (
    <Text style={CommonStyles.subheaderleft}>
      Black and white x-rays only.{'\n'}
      {'\n'} During your visit, your GP will advise you if x-rays are necessary.
      {'\n'}
      {'\n'}
      Specialised radiology like MRI/CT Scans are not covered.
    </Text>
  );
};

export const Pathology = () => {
  return <Text style={CommonStyles.infoheader}>Pathology{'\n'} Limited</Text>;
};
export const PathologyLimited = () => {
  return (
    <Text style={CommonStyles.subheaderleft}>
      Basic list of blood tests e.g. cholesterol / glucose test.{'\n'}
      {'\n'}
      During your visit, your GP will advise you if blood tests are necessary.
      {'\n'}
      {'\n'}
      COVID-19 Screening - Access to a COVID-19 PCR pathology test. The benefit
      is payable if you test positive for COVID-19.{'\n'}
      {'\n'} Pre-authorisation and referral by a network GP are required.
    </Text>
  );
};

export const Maternity = () => {
  return <Text style={CommonStyles.infoheader}>Pre-birth Maternity</Text>;
};
export const MaternityLimited = () => {
  return (
    <Text style={CommonStyles.subheaderleft}>
      2 gynaecologist consultations and 2 ultrasound scans per year.{'\n'}
      {'\n'} Up to R3 425 per family, per year. Pre-authorisation is required.{' '}
      {'\n'}
      {'\n'}You may go to any gynaecologist. Upfront payment may be required, in
      which case we will reimburse you.
    </Text>
  );
};

/////////////////////// Wellness Program ////////////////////////////////////////

export const Health = () => {
  return <Text style={CommonStyles.infoheader}>Health Screenings</Text>;
};
export const HealthScreening = () => {
  return (
    <Text style={CommonStyles.subheaderleft}>
      Health Screenings include health checks for blood pressure, cholesterol,
      glucose levels, body mass index (BMI), waist circumference and HIV
      (including pre and post test counselling).{'\n'}
      {'\n'} Available at approved pharmacies. Limited to one screening per
      person per year.
    </Text>
  );
};

export const Pap = () => {
  return <Text style={CommonStyles.infoheader}>Pap Smears</Text>;
};
export const PapSmears = () => {
  return (
    <Text style={CommonStyles.subheaderleft}>
      Available once every 3 years after the age of 21.{'\n'} Available at
      approved pharmacies. Your Unity Health Network GP may or may not offer pap
      smears.
    </Text>
  );
};

export const Psa = () => {
  return <Text style={CommonStyles.infoheader}>PSA Screening</Text>;
};
export const PSAScreening = () => {
  return (
    <Text style={CommonStyles.subheaderleft}>
      Available once every 2 years after the age of 50. Available at approved
      pharmacies.
    </Text>
  );
};

export const Vaccination = () => {
  return <Text style={CommonStyles.infoheader}>Vaccination Programme</Text>;
};
export const VaccinationProgram = () => {
  return (
    <Text style={CommonStyles.subheaderleft}>
      Influenza: Available annually - needs to be administered by 31 May each
      year.{'\n'}
      {'\n'}
      Tetanus: Available once every 10 years.{'\n'}
      {'\n'}
      Hepatitis A and B: Available once-off.{'\n'}
      {'\n'}
      Pneumococcal: Available once every 5 years for those aged 60 or older and
      for those individuals with a medically proven compromised immune system.
      {'\n'}
      Pre-authorisation is required.
    </Text>
  );
};

export const Telephonic = () => {
  return (
    <Text style={CommonStyles.infoheader}>
      Telephonic Assistance{'\n'} Program
    </Text>
  );
};
export const TelephonicAssistance = () => {
  return (
    <Text style={CommonStyles.subheaderleft}>
      Unlimited telephonic and Skype counselling services are provided by
      registered counsellors who follow specific procedures and clinical
      protocols.{'\n'}
      {'\n'} The service is available 24/7 and includes: Critical
      incidence/trauma counselling, HIV counselling, legal advice and financial
      advice.{'\n'}
      {'\n'} Face to face counselling can be arranged for the member’s own
      account.
    </Text>
  );
};

//////////////////////////////////// HOSPITAL COVER ///////////////////////////////////////

export const HSummary = () => {
  return <Text style={CommonStyles.infoheader}>Summary</Text>;
};
export const HospitalSummary = () => {
  return (
    <Text style={CommonStyles.subheaderleft}>
      No Waiting period for hospital care plan only. {'\n'} {'\n'} Please note
      that number of benefits on your policy require pre-authorisation.Please
      contact our Call Centre on 0861 366 066 to access benefits.{'\n'} {'\n'}
      Failure to obtain authorisation for specific benefits under your policy
      will result in claims not being paid. {'\n'} {'\n'}
      This product is not medical scheme and the required cover(benefits and
      contributions) are not the same as that of a medical scheme.{'\n'}
      {'\n'}
      Note: This is not a medical scheme and the cover is not the same as that
      of a medical scheme.{'\n'} This policy is not a substitute for medical
      scheme membership
    </Text>
  );
};

export const InPatient = () => {
  return (
    <Text style={CommonStyles.infoheader}>
      Inpatient Hospital Treatment{'\n'} Accident Only
    </Text>
  );
};
export const InPatientHospital = () => {
  return (
    <Text style={CommonStyles.subheaderleft}>
      The actual cost of hospitalisation as an inpatient, including all
      associated services during the hospital admission at a private facility in
      the event of injuries sustained due to an accident.{'\n'}
      {'\n'}
      Plan C: Sublimit of R1 250 000 per person per incident. Pre-authorisation
      required.
      {'\n'}
      {'\n'}
      What is an emergency?{'\n'}
      An event or unexpected health condition, which if not treated immediately,
      would result in death or serious bodily impairment. E.g. Heart attack /
      stroke.
    </Text>
  );
};

export const Stabalisation = () => {
  return (
    <Text style={CommonStyles.infoheader}>
      Inpatient Hospital Stabilisation{'\n'} Emergency Only
    </Text>
  );
};
export const InPatientStabilisation = () => {
  return (
    <Text style={CommonStyles.subheaderleft}>
      The actual cost of hospitalisation as an inpatient, in the event of an
      emergency that necessitates the stabilisation of the patient before the
      patient is transferred to a public hospital, if deemed necessary.{'\n'}
      {'\n'}
      Note: Surgical procedures are not covered.{'\n'}
      Sublimit of R26 500 per person per incident. Pre-authorisation required.
    </Text>
  );
};

export const Outpatient = () => {
  return (
    <Text style={CommonStyles.infoheader}>
      Outpatient Casualty Treatment{'\n'} Accident Only
    </Text>
  );
};
export const OutpatientTreatment = () => {
  return (
    <Text style={CommonStyles.subheaderleft}>
      The benefit payable for injuries sustained as a result of a minor accident
      shall be limited to treatment received in a hospital emergency unit.{'\n'}
      {'\n'}
      Sublimit of R6 850 per person per incident. Pre-authorisation required.
      {'\n'}
      {'\n'}
      What is an accident?{'\n'}
      An accident means bodily injury caused by violent accidental and external
      physical means.{'\n'}
      {'\n'}
      E.g. Motor vehicle accident / burns / injuries from a crime / snake bite /
      injuries from a fall.
    </Text>
  );
};

export const Emergency = () => {
  return (
    <Text style={CommonStyles.infoheader}>
      Emergency Evacuation{'\n'} (ER24)
    </Text>
  );
};
export const EmergencyEvacuation = () => {
  return (
    <Text style={CommonStyles.subheaderleft}>
      Emergency evacuation, including:{'\n'}
      {'\n'}• Ambulance services (air or road).{'\n'}• Unity Health push-to-call
      emergency dialing, geo-locating and find a provider mobile application.
      {'\n'}• Telephonic medical advice (Ask-a-Doctor or Ask-a-Nurse).{'\n'}•
      Inter-hospital transfers.{'\n'}• Repatriation of mortal remains within the
      borders of South Africa.{'\n'}
    </Text>
  );
};

export const MRI = () => {
  return (
    <Text style={CommonStyles.infoheader}>
      MRI and CT Scans{'\n'} Accident Only
    </Text>
  );
};
export const MRICT = () => {
  return (
    <Text style={CommonStyles.subheaderleft}>
      The actual cost of an MRI or CT scan necessitated as a result of an injury
      sustained due to an accident.{'\n'}
      Limited to R18 000 per person per year. Pre-authorisation required.
    </Text>
  );
};

export const Physio = () => {
  return (
    <Text style={CommonStyles.infoheader}>
      Physio and Occupational{'\n'} Therapists
    </Text>
  );
};
export const PhsioTherapy = () => {
  return (
    <Text style={CommonStyles.subheaderleft}>
      Physiotherapy and occupational therapy following an inpatient
      hospitalisation due to an accident.{'\n'}
      {'\n'}
      Limited to a period of 3 months following the discharge from an inpatient
      hospitalisation incident.{'\n'}
      {'\n'}
      Limited to R3 425 per person per year. Pre-authorisation required.{'\n'}
    </Text>
  );
};

export const Death = () => {
  return <Text style={CommonStyles.infoheader}>Accidental Death Benefit</Text>;
};
export const DeathBenefit = () => {
  return (
    <Text style={CommonStyles.subheaderleft}>
      Limited to R25 000 per principle insured and first spouse dependant.
      Beneficiary nomination is required.{'\n'} R5 000 for each child dependant
      (motor vehicle accidents only).
    </Text>
  );
};

/////////////////////////////////////// TERMS AND CONDITIONS //////////////////////////////////
export const Term = () => {
  return <Text style={CommonStyles.header}>TERMS AND CONDITIONS</Text>;
};
export const TermsCondition = () => {
  return (
    <Text style={CommonStyles.subheaderleft}>
      Having applied for the above mentioned Unity Health Policy and on
      acceptance of my application by the Insurer, I hereby authorise the
      Insurer or its representative to debit my account with the premiums
      payable under the above plan on the chosen day of each month in accordance
      with the Debit order system. Such authorisation shall remain in force and
      effect until cancelled by myself, in writing with 31 days notice. {'\n'} I
      further authorise the Insurer to increase the amount due in terms of the
      policy from time to time and authorise my bank to effect payment on
      relevant increases. Notwithstanding the fact that I grant the Insurer
      permission to collect premiums, I acknowledge that I need to ensure that
      premiums are collected for cover to remain in force. In the event that the
      collection day falls on a Sunday, or recognised South African public
      holiday, the collection day will automatically be the very next ordinary
      business day. I declare that the contents of the form are true, correct
      and complete. {'\n'} {'\n'} I have read the terms and conditions and I
      accept the contents thereof.
    </Text>
  );
};

////////////////////////////////////////////// DISCLOUSURE////////////////////////////////////////

export const Disclosure = () => {
  return <Text style={CommonStyles.header}>DISCLOSURES</Text>;
};
export const DisclosureText = () => {
  return (
    <Text style={CommonStyles.subheaderleft}>
      Unity Health hereby confirms:{'\n'} a) That the applicant and his/her
      dependants personal and medical information, (obtained from healthcare
      providers) will be kept confidential.{'\n'} b) That both personal and
      medical information obtained by Unity Health will not be used or sold
      commercially.{'\n'} c) That data security measures are in place at Unity
      Health.{'\n'} d) That staff of Unity Health as well as its contracted
      third parties are bound by confidentiality agreements.{'\n'} e) That the
      insurer’s contractual agreements ensure the confidentiality of data
      management and administration. {'\n'}USE OF PERSONAL INFORMATION
      DECLARATION{'\n'} I hereby consent to Unity Health processing my personal
      information, including but not limited to, the administrative functions
      listed below.{'\n'} • Processing this application; • Processing of future
      instructions submitted; {'\n'}• Communications with me in relation to any
      matters in relation to my policy. I consent to Unity Health disclosing and
      transferring my personal information to any contracted third party for the
      purposes of collecting premiums, claim assessments and statutory reporting
      in connection with this contract. I acknowledge I have the right to:{'\n'}{' '}
      • Object to the processing of my personal information on reasonable
      grounds unless legislation allows for such processing, in the manner
      prescribed by the POPI Act;{'\n'} • lodge a complaint with the Information
      Regulator; {'\n'}• request from Unity Health details of any of my personal
      information Unity Health holds on my behalf and details of how my personal
      information has been processed. Unity Health will use its best endeavours
      to ensure your personal information is reliable, however it remains your
      responsibility to advise Unity Health of any changes to your personal
      information in a timely manner. The information supplied to Unity Health
      must be complete, correct and up to date. I understand why my personal
      information is required and the purpose it will be used and I, hereby,
      give Unity Health consent to process my personal information as provided
      above. DECLARATION I declare that I have not withheld any information and
      I accept that this application and declaration shall be the basis of the
      contract of insurance between me and the insurer, which will become
      effective on the first day of the month for which premiums are received. I
      also acknowledge that I have requested and instructed the broker not to
      complete a financial needs analysis. Furthermore, I understand and accept
      that this instruction not to proceed with a full financial needs analysis
      could have the effect that all my financial needs may not be properly
      addressed.{'\n'} I further confirm that the following notable conditions
      have been explained to me:{'\n'} a) No benefits will be payable during a
      general 2-month waiting period for all treatment received except for
      inpatient hospital treatment or outpatient casualty treatment.{'\n'}
      b) No benefits will be payable during a 12-month waiting period for all
      chronic medication and optometry benefits.{'\n'} c) No benefits will be
      payable during a 9-month waiting period for all pre-birth maternity
      benefits.{'\n'} d) Not all my dependants are automatically covered under
      this policy, only my adult dependents and eligible children are covered as
      per the policy definitions.{'\n'} e) Waiting periods do not apply to our
      Emergency and Accident Benefits and Assistance Programme (AP).{'\n'} f) By
      signing this application form, you acknowledge and accept that your policy
      will be subject to waiting periods for specific medical events.{'\n'} I,
      the undersigned applicant:{'\n'}
      a) Acknowledge that it is my responsibility to ensure that claims are
      submitted within the 4-month submission period.{'\n'} b) Acknowledge that
      it is my responsibility to ensure that the monthly premium is received by
      the insurer.{'\n'} c) Acknowledge and accept that Unity Health reserves
      the right to cancel the policy if any premium is not paid on the due date.
      {'\n'} d) Undertake to inform the insurer within thirty-one (31) days
      should the situation regarding the dependency of my spouse, eligible adult
      and child dependents change.{'\n'} e) Hereby consent to all conversations
      between myself, the insurer or any party as being recorded;{'\n'} f) I
      further authorise and instruct the insurer and any medical provider
      (including emergency and hospital providers) concerned to give any
      information relating to myself and my dependants to the staff appointed by
      the insurer, for the purposes of ensuring that the members of the policy
      receive appropriate and necessary medical services while reducing
      inappropriate care and wastage of medical resources.{'\n'} g) I understand
      that should I request to terminate my policy with Unity Health, I will be
      required to place 31 days’ written notice with the insurer.{'\n'} h) I
      confirm that although I have completed this application form, it does not
      constitute an insurance contract until a policy number is assigned, policy
      issued, and premium is successfully paid.
    </Text>
  );
};

////////////////////////////////////////////////////// FICA QUESTIONNAIRE ////////////////////////////////////////////////////

export const Fica = () => {
  return (
    <Text style={CommonStyles.subheaderleft}>
      Are any insured persons a domestic prominent influenfical person(DPIP) or
      Foreign prominent public official (FPPO) or a client, associate or family
      member of a DPIP/FPPO?
    </Text>
  );
};

///////////////////////////////////////////////// CONGRATULATION //////////////////////////////////////////////////////////////

export const Congrats = () => {
  return (
    <Text style={CommonStyles.subheaderleft}>
      You have successfully completed the New Prespective Health application
    </Text>
  );
};

//////////////////////////////////////////////// APPLICATION PROCESSED ///////////////////////////////////////////////////////

export const AppProcessed = () => {
  return (
    <Text style={CommonStyles.subheaderleft}>
      {/* Your Application is currently being processed. {'\n'} {'\n'}Please allow
      up to 48 hours for a member to make contact with you for verification.
      {'\n'} {'\n'}
      Alternately reach out one of our broker. */}
      We're so excited you made it to the end of your digital health insurance
      application.{'\n'} {'\n'}
      You have successfully submitted your request for low-cost health
      insurance, and we will begin processing your application immediately.
      {'\n'} {'\n'}
      We know insurance can be a pain, but we're here to make it go as smoothly
      as possible. Our team is committed to helping you feel supported during
      the enrollment process and well beyond.{'\n'} {'\n'}
      New Perspective Insurance Consultants, an authorized FSP 51099,{'\n'}{' '}
      contact info: 0796464109 or stuart@npinsurance.co.za
    </Text>
  );
};

//////////////////////////////////////////////// ADDITIONAL INFO MODAL ///////////////////////////////////////////////////////

export const CoverHeader = () => {
  return <Text style={CommonStyles.infoheader}>WHO WE COVER</Text>;
};

export const CoverContent = () => {
  return (
    <Text style={CommonStyles.subheaderleft}>
      We cover you, your spouse, eligible child and adult dependents for whom
      you are a parent or legal guardian of your child dependant aged 20 or
      younger at a child dependant premium; your child dependant aged 21 or
      older at an adult dependant premium if your dependant is financially
      dependant on you and proof is submitted every year. {'\n'} {'\n'}We accept
      proof of full-time studies from an educational facility or 3 months’
      stamped copies of your dependant’s most recent bank statements.
    </Text>
  );
};

export const PaymentHeader = () => {
  return <Text style={CommonStyles.infoheader}>PAYMENT PREMIUM</Text>;
};

export const PaymentContent = () => {
  return (
    <Text style={CommonStyles.subheaderleft}>
      Having applied for the above mentioned Unity Health Policy and on
      acceptance of my application by the Insurer, {'\n'} {'\n'} I hereby
      authorise the Insurer or its representative to debit my account with the
      premiums payable under the above plan on the chosen day of each month in
      accordance with the Debit order system. {'\n'} {'\n'} Such authorisation
      shall remain in force and effect until canceled by myself, in writing with
      31 days notice. {'\n'} {'\n'} I further authorise the Insurer to increase
      the amount due in terms of the policy from time to time and authorise my
      bank to effect payment on relevant increases. {'\n'} {'\n'}{' '}
      Notwithstanding the fact that I grant the Insurer permission to collect
      premiums, I acknowledge that I need to ensure that premiums are collected
      for cover to remain in force. {'\n'} {'\n'} In the event that the
      collection day falls on a Sunday, or recognised South African public
      holiday, the collection day will automatically be the very next ordinary
      business day.
    </Text>
  );
};

export const BeneficiaryHeader = () => {
  return <Text style={CommonStyles.infoheader}>NOMINATED BENEFICIARY</Text>;
};

export const BeneficairyContent = () => {
  return (
    <Text style={CommonStyles.subheaderleft}>
      Nominate a beneficiary to whom the benefit amount under your ACCIDENTAL
      DEATH BENEFIT will be paid to in the event of your accidental death.
      {'\n'} {'\n'}
      If a beneficiary is not nominated the benefit amount will be paid to your
      estate. In the event of your spouse’s accidental death, the benefit amount
      will be paid to the principal insured person on the policy. {'\n'} {'\n'}
      Please refer to your policy documentation for full terms and conditions.
    </Text>
  );
};
////////////////////////////////////////////////////////////// DISCLOSURE TEXT ////////////////////////////////////////////////////////////

export const DiscHeader = () => {
  return <Text style={CommonStyles.infoheader}>DISCLOSURE</Text>;
};

export const DiscContent = () => {
  return (
    <Text style={CommonStyles.subheaderleft}>
      Underwritten by Constantia Insurance Company Limited, an authorised FSP
      31111 (The Licensed Insurer).{'\n'}
      {'\n'} This is not a medical scheme and the cover is not the same as that
      of a medical scheme. This policy is not a substitute for medical scheme
      membership.{'\n'}
      {'\n'} The master policy issued is the source of all benefits, rights, and
      obligations and exclusions. {'\n'}
      {'\n'}To determine your individual needs, we suggest that you contact your
      broker and request advice from them. {'\n'}
      {'\n'}“Unity Health is a division of Ambledown Financial Services (Pty)
      Ltd. FSP 10287”
    </Text>
  );
};
