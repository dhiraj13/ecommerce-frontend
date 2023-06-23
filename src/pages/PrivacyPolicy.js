import BreadCrumb from "../components/Breadcrumb";
import Container from "../components/Container";
import Meta from "../components/Meta";

const PrivacyPolicy = () => {
  return (
    <>
      <Meta title="Privacy Policy" />
      <BreadCrumb title="Privacy Policy" />
      <Container class1="policy-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="policy"></div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default PrivacyPolicy;
