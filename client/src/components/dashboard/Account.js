import React from "react";

function Account() {
  return (
    <>
      <section>
        <h2>your profile</h2>
        <section>
          <h3>change password</h3>
          <button>submit</button>

          <section>
            <label htmlFor="old-password">type old password</label>

            <input id="old-password" type="text" placeholder="type here..." />
          </section>
          <section>
            <label htmlFor="new-password">type new password</label>
            <input id="new-password" type="text" placeholder="type here..." />
          </section>
          <section>
            <label htmlFor="retype-new-password">type new password</label>
            <input
              id="retype-new-password"
              type="text"
              placeholder="type here..."
            />
          </section>
        </section>
        <section>
          <h3> change email</h3>
          <label htmlFor="new-email">type old email</label>
          <input id="new-email" type="text" placeholder="type here..." />s
        </section>
        <section>
          {" "}
          <label htmlFor="retype-new-email">type new email</label>
          <input id="retype-new-email" type="text" placeholder="type here..." />
          s
        </section>
      </section>
    </>
  );
}
export default Account;
