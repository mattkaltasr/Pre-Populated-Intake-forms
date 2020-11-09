import React from "react";
import PropTypes from "prop-types";

import Checkbox from "../formElements/Checkbox";
import Button from "../formElements/Button";

const ConsentForm = ({ handleConsentAgree }) => {
  const [didRead, setDidRead] = React.useState(false);

  return (
    <div
      className="flex flex-col form-container"
      style={{
        border: "none",
      }}
    >
      <div
        className="flex flex-col"
        style={{
          maxWidth: "800px",
          flex: 1,
          margin: "0 auto auto auto",
        }}
      >
        <h3 style={{ margin: "0 auto 0.5em auto" }}>Consent Form</h3>
        <span style={{ textAlign: "center", marginBottom: "1em" }}>
          Please acknowledge reading and accepting conditions in consent form.
        </span>
        <div
          style={{
            backgroundColor: "rgb(204, 204, 204, .26)",
            padding: "1em 2em 1em 2em",
            borderRadius: "0.28em",
          }}
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Dolor
            purus non enim praesent elementum facilisis leo. Sapien pellentesque
            habitant morbi tristique senectus et netus et malesuada. Interdum
            posuere lorem ipsum dolor. Amet consectetur adipiscing elit
            pellentesque habitant morbi tristique. Pellentesque elit eget
            gravida cum. Pulvinar sapien et ligula ullamcorper malesuada.
            Venenatis cras sed felis eget velit aliquet sagittis id consectetur.
            Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed
            ullamcorper. Faucibus purus in massa tempor. Odio facilisis mauris
            sit amet massa vitae tortor. Velit ut tortor pretium viverra. Est
            pellentesque elit ullamcorper dignissim cras tincidunt lobortis. Eu
            sem integer vitae justo eget. Amet porttitor eget dolor morbi.
            Malesuada pellentesque elit eget gravida cum. Semper feugiat nibh
            sed pulvinar proin gravida. Nunc sed velit dignissim sodales ut.
            Volutpat lacus laoreet non curabitur. Aliquam purus sit amet luctus
            venenatis lectus. Cursus mattis molestie a iaculis at erat.
          </p>
          <p>
            Mauris cursus mattis molestie a iaculis at erat pellentesque.
            Senectus et netus et malesuada fames ac turpis egestas. Amet
            volutpat consequat mauris nunc congue nisi vitae suscipit tellus.
            Dolor sit amet consectetur adipiscing elit ut. Vel turpis nunc eget
            lorem dolor. Amet consectetur adipiscing elit ut aliquam purus. Ut
            enim blandit volutpat maecenas volutpat blandit. Sed ullamcorper
            morbi tincidunt ornare. Ac ut consequat semper viverra nam libero
            justo laoreet sit. Est velit egestas dui id. Nulla at volutpat diam
            ut. Vulputate ut pharetra sit amet aliquam id diam. Nunc id cursus
            metus aliquam eleifend. Nulla malesuada pellentesque elit eget
            gravida cum sociis natoque penatibus. Arcu odio ut sem nulla
            pharetra. Mattis ullamcorper velit sed ullamcorper morbi tincidunt.
            Nisl suscipit adipiscing bibendum est ultricies integer quis auctor.
            Quis viverra nibh cras pulvinar mattis nunc sed. Eleifend mi in
            nulla posuere sollicitudin aliquam ultrices sagittis orci. Sit amet
            mattis vulputate enim nulla aliquet porttitor lacus. Sit amet
            aliquam id diam maecenas. Proin libero nunc consequat interdum
            varius sit. Eget dolor morbi non arcu risus quis varius quam. Libero
            id faucibus nisl tincidunt eget nullam non nisi. Eget egestas purus
            viverra accumsan in nisl nisi scelerisque.
          </p>
          <p>
            Senectus et netus et malesuada fames. Dictumst quisque sagittis
            purus sit amet volutpat. Phasellus egestas tellus rutrum tellus
            pellentesque eu tincidunt tortor. Habitasse platea dictumst
            vestibulum rhoncus est. Egestas congue quisque egestas diam in. Orci
            dapibus ultrices in iaculis nunc sed augue lacus viverra. Vitae nunc
            sed velit dignissim sodales ut. Tempus iaculis urna id volutpat.
            Vitae suscipit tellus mauris a. Nisi scelerisque eu ultrices vitae
            auctor eu augue ut. Posuere morbi leo urna molestie at elementum.
            Quam quisque id diam vel. Dictum at tempor commodo ullamcorper a.
            Dui faucibus in ornare quam viverra orci. Eu feugiat pretium nibh
            ipsum consequat. Varius duis at consectetur lorem donec massa.
            Pharetra massa massa ultricies mi quis hendrerit. Porttitor lacus
            luctus accumsan tortor posuere ac. Volutpat blandit aliquam etiam
            erat velit scelerisque in dictum. A iaculis at erat pellentesque
            adipiscing commodo elit at imperdiet. Vulputate enim nulla aliquet
            porttitor lacus luctus accumsan tortor posuere. Cursus eget nunc
            scelerisque viverra mauris in aliquam sem fringilla. Vitae semper
            quis lectus nulla. Gravida cum sociis natoque penatibus et magnis
            dis parturient. At tellus at urna condimentum mattis pellentesque id
            nibh. Lacus vel facilisis volutpat est velit egestas. Ornare lectus
            sit amet est placerat in egestas erat imperdiet. Nullam ac tortor
            vitae purus. Sociis natoque penatibus et magnis dis parturient
            montes nascetur.
          </p>
        </div>
      </div>
      <div className="flex flex-col" style={{ margin: "1em auto 0 auto" }}>
        <Checkbox
          title="I have read the consent form."
          checked={didRead}
          setFieldValue={() => setDidRead(!didRead)}
        />
        <div className="flex">
          <Button
            style={{ margin: "auto auto auto 0", width: "7em" }}
            text="Agree"
            disabled={!didRead}
            onClick={() => handleConsentAgree(true)}
          />
          <Button
            style={{
              margin: "auto 0 auto auto",
              width: "7em",
              backgroundColor: "lightgray",
              color: "black",
            }}
            text="Disagree"
            disabled={!didRead}
            onClick={() => handleConsentAgree(false)}
          />
        </div>
      </div>
    </div>
  );
};

ConsentForm.propTypes = {
  handleConsentAgree: PropTypes.func.isRequired,
};

export default ConsentForm;
