import React from "react";

const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

const countriesWithCities = {
  India: ["Delhi", "Mumbai", "Bangalore"],
  USA: ["New York", "San Francisco", "Chicago"],
  UK: ["London", "Manchester", "Bristol"],
};

class FormComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      emailAddress: "",
      password: "",
      showPassword: false,
      passwordConfirmation: "",
      phoneCountryCode: "+91",
      phoneNumber: "",
      country: "",
      city: "",
      panNo: "",
      aadharNo: "",

      // Error states
      errors: {},

      isFormSubmitted: false
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  togglePasswordVisibility = () => {
    this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
  };

  validateFields = () => {
    const errors = {};
    const {
      firstName,
      lastName,
      username,
      emailAddress,
      password,
      passwordConfirmation,
      phoneNumber,
      country,
      city,
      panNo,
      aadharNo
    } = this.state;

    if (!firstName.trim()) errors.firstName = "First Name is required";
    if (!lastName.trim()) errors.lastName = "Last Name is required";
    if (!username.trim()) errors.username = "Username is required";
    if (!emailAddress.trim()) errors.emailAddress = "Email is required";
    else if (!emailValidator.test(emailAddress))
      errors.emailAddress = "Invalid email format";

    if (!password) errors.password = "Password is required";
    else if (!passwordValidator.test(password))
      errors.password = "Weak password. Must contain 1 number, 1 lowercase, 1 uppercase, 8+ chars";

    if (password !== passwordConfirmation)
      errors.passwordConfirmation = "Passwords do not match";

    if (!phoneNumber.trim()) errors.phoneNumber = "Phone number is required";
    if (!country) errors.country = "Country is required";
    if (!city) errors.city = "City is required";
    if (!panNo.trim()) errors.panNo = "PAN is required";
    if (!aadharNo.trim()) errors.aadharNo = "Aadhar is required";

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const isValid = this.validateFields();
    this.setState({ isFormSubmitted: isValid });
  };

  render() {
    const {
      firstName, lastName, username, emailAddress, password, passwordConfirmation,
      showPassword, phoneCountryCode, phoneNumber, country, city, panNo, aadharNo,
      errors, isFormSubmitted
    } = this.state;

    return (
      <div className="main">
        <h2>Registration Form</h2>
        {isFormSubmitted ? (
          <div className="details">
            <h3>Submitted Details:</h3>
            <p><b>Name:</b> {firstName} {lastName}</p>
            <p><b>Username:</b> {username}</p>
            <p><b>Email:</b> {emailAddress}</p>
            <p><b>Phone:</b> {phoneCountryCode} {phoneNumber}</p>
            <p><b>Country:</b> {country}</p>
            <p><b>City:</b> {city}</p>
            <p><b>PAN:</b> {panNo}</p>
            <p><b>Aadhar:</b> {aadharNo}</p>
          </div>
        ) : (
          <form onSubmit={this.handleSubmit}>
            <input name="firstName" placeholder="First Name" value={firstName} onChange={this.handleChange} />
            {errors.firstName && <div className="errorMsg">{errors.firstName}</div>}

            <input name="lastName" placeholder="Last Name" value={lastName} onChange={this.handleChange} />
            {errors.lastName && <div className="errorMsg">{errors.lastName}</div>}

            <input name="username" placeholder="Username" value={username} onChange={this.handleChange} />
            {errors.username && <div className="errorMsg">{errors.username}</div>}

            <input name="emailAddress" placeholder="Email" value={emailAddress} onChange={this.handleChange} />
            {errors.emailAddress && <div className="errorMsg">{errors.emailAddress}</div>}

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={password}
              onChange={this.handleChange}
            />
            <button type="button" onClick={this.togglePasswordVisibility}>
              {showPassword ? "Hide" : "Show"}
            </button>
            {errors.password && <div className="errorMsg">{errors.password}</div>}

            <input
              type="password"
              name="passwordConfirmation"
              placeholder="Confirm Password"
              value={passwordConfirmation}
              onChange={this.handleChange}
            />
            {errors.passwordConfirmation && <div className="errorMsg">{errors.passwordConfirmation}</div>}

            <div>
              <input
                style={{ width: "60px" }}
                name="phoneCountryCode"
                value={phoneCountryCode}
                onChange={this.handleChange}
              />
              <input
                name="phoneNumber"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={this.handleChange}
              />
              {errors.phoneNumber && <div className="errorMsg">{errors.phoneNumber}</div>}
            </div>

            <select name="country" value={country} onChange={this.handleChange}>
              <option value="">--Select Country--</option>
              {Object.keys(countriesWithCities).map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            {errors.country && <div className="errorMsg">{errors.country}</div>}

            <select name="city" value={city} onChange={this.handleChange}>
              <option value="">--Select City--</option>
              {(countriesWithCities[country] || []).map((ct) => (
                <option key={ct} value={ct}>{ct}</option>
              ))}
            </select>
            {errors.city && <div className="errorMsg">{errors.city}</div>}

            <input name="panNo" placeholder="PAN Number" value={panNo} onChange={this.handleChange} />
            {errors.panNo && <div className="errorMsg">{errors.panNo}</div>}

            <input name="aadharNo" placeholder="Aadhar Number" value={aadharNo} onChange={this.handleChange} />
            {errors.aadharNo && <div className="errorMsg">{errors.aadharNo}</div>}

            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    );
  }
}

export default FormComponent;
