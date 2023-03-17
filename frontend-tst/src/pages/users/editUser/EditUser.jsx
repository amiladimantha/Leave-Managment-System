import "./edituser.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  UserOutlined,
  CalendarOutlined,
  MailOutlined,
  HomeOutlined,
  UploadOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { DatePicker, Input, Button, Form, message } from "antd";
import CryptoJS from "crypto-js";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const defaultImageSrc =
  "https://th.bing.com/th/id/OIP.ruat7whad9-kcI8_1KH_tQHaGI?pid=ImgDet&rs=1";

const imgdata = {
  imageSrc: defaultImageSrc,
  imageFile: null,
};

export default function EditUser() {
  const [form] = Form.useForm();

  const [values, setValues] = useState({
    imageSrc: defaultImageSrc,
    imageFile: null,
  });

  useEffect(() => {
    setUserName(localStorage.getItem("username"));
    setUserID(localStorage.getItem("id"));
    setEmail(localStorage.getItem("email"));
    setPhone(localStorage.getItem("phone"));
    setBirthday(localStorage.getItem("birthday"));
    setAddress(localStorage.getItem("address"));
  }, []);

  const [username, setUserName] = useState();
  const [id, setUserID] = useState();
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [birthday, setBirthday] = useState();
  const [address, setAddress] = useState();
  const [dob, setDob] = useState();

  const [password, setPassword] = useState();
  const [repassword, setRePassword] = useState();
  const [errors, setErrors] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSave = (e) => {
    e.preventDefault();
    const url = "https://localhost:7046/api/Profile/EditProfile";

    const data = {
      ID: id,
      Name: name,
      Phone: phone,
      Birthday: dob,
      Address: address,
    };
    console.log(data);

    axios
      .post(url, data)
      .then((result) => {
        const dt = result.data;
        message.success(dt.statusMessage);
      })
      .catch((error) => {
        message.error(error);
      });
  };

  const handleSavePassword = (e) => {
    e.preventDefault();
    const url =
      "https://localhost:7046/api/Profile/EditProfilePassword";

    // encrypt the password
    const key = CryptoJS.enc.Utf8.parse("encryptionIntVec");
    const iv = CryptoJS.enc.Utf8.parse("aesEncryptionKey");
    const encryptedPassword = CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(password),
      key,
      {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    ).toString();

    const data = {
      ID: id,
      Password: encryptedPassword,
    };
    console.log(data);

    axios
      .post(url, data)
      .then((result) => {
        const dt = result.data;
        alert(dt.statusMessage);
        alert(
          "You will be logged out. Please Login again with the new Password"
        );
      })
      .catch((error) => {
        console.log(error);
      });

    localStorage.clear();
    window.location.href = "/";
  };

  const handleSaveEmail = (e) => {
    e.preventDefault();
    const url = "https://localhost:7046/api/Profile/EditProfileEmail";
    const data = {
      ID: id,
      Email: email,
    };
    console.log(data);

    axios
      .post(url, data)
      .then((result) => {
        const dt = result.data;
        alert(dt.statusMessage);
        alert("You will be logged out. Please Login again with the new Email");
      })
      .catch((error) => {
        message.error(error);
      });

    localStorage.clear();
    window.location.href = "/";
  };

  const validate = () => {
    let temp = {};
    temp.imageSrc = values.imageSrc === defaultImageSrc ? false : true;
    setErrors(temp);
    return Object.values(temp).every((x) => x === true);
  };

  // const handleSaveImage = async (e,id) => {
  //   e.preventDefault();
  //   let formData = new FormData();
  //   formData.append("image", values.imageFile);
  //   formData.append("ID",id);
  //   try {
  //     const response = await axios.post("https://localhost:7068/api/EditProfileImage", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //     if (response.status === 200) {
  //       // handle successful image upload
  //       setValues({ ...values, imageSrc: response.data.imageUrl });
  //       //You can show a message to the user
  //       message.success("Image uploaded successfully!");
  //       console.log(formData)
  //     }
  //   } catch (err) {
  //     // handle error
  //     console.log(err);
  //     message.error("Failed to upload image. Please try again later.");
  //   }
  // };

  const handleSaveImage = (e) => {
    e.preventDefault(); // prevent the form from submitting
  
    if (!selectedFile) {
      // show an error message if no file is selected
      setErrors("Please select an image to upload");
      return;
    }
  
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("ID", id);
  
    fetch("https://localhost:7046/api/Profile/EditProfileImage", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };
  
  const applyErrorClass = (field) =>
    field in errors && errors[field] === false ? " invalid-field" : "";

  const showPreview = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedFile({
          file: event.target.files[0],
          preview: e.target.result,
        });
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  function DetailsSubmit() {
    if (name && email && phone && dob && address) {
      return (
        <Button type="primary" htmlType="submit" onClick={(e) => handleSave(e)}>
          Update
        </Button>
      );
    } else {
      <Button
        type="primary"
        htmlType="submit"
        onClick={(e) => handleSave(e)}
        disabled={true}
      >
        Update
      </Button>;
    }
  }

  function PasswordSubmit() {
    if (password === repassword) {
      return (
        <Button
          type="primary"
          htmlType="submit"
          onClick={(e) => handleSavePassword(e)}
        >
          Update
        </Button>
      );
    } else {
      <Button
        type="primary"
        htmlType="submit"
        onClick={(e) => handleSavePassword(e)}
        disabled={true}
        placeholder="button"
      >
        Update
      </Button>;
    }
  }

  function EmailSubmit() {
    if (email) {
      return (
        <Button
          type="primary"
          htmlType="submit"
          onClick={(e) => handleSaveEmail(e)}
        >
          Update
        </Button>
      );
    } else {
      <Button
        type="primary"
        htmlType="submit"
        onClick={(e) => handleSaveEmail(e)}
        disabled={true}
        placeholder="button"
      >
        Update
      </Button>;
    }
  }

  return (
    <div className="user">
      <div className="userItemContainer">
        <h1 className="userTitle">Edit User</h1>
        {/* <button className="userAddButton">Create</button> */}
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2022%2F12%2Fgame-of-thrones-kit-harington-teases-jon-snow-spinoff-series-tw.jpg?w=960&cbr=1&q=90&fit=max"
              alt=""
              className="userShowImage"
            />
            <div className="userShowTopTitle">
              <span className="userShowUserNAme">UserID : {id}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Details</span>
            <div className="userShowInfo">
              <UserOutlined className="userShowIcon" />
              <span className="userShowInfoTitle">
                <label htmlFor="">{username}</label>
              </span>
            </div>
            <div className="userShowInfo">
              <CalendarOutlined className="userShowIcon" />
              <span className="userShowInfoTitle">
                <label placeholder="not set yet">{birthday}</label>
              </span>
            </div>
            <div className="userShowInfo">
              <MailOutlined className="userShowIcon" />
              <span className="userShowInfoTitle">
                <label htmlFor="">{email}</label>
              </span>
            </div>
            <div className="userShowInfo">
              <PhoneOutlined className="userShowIcon" />
              <span className="userShowInfoTitle">
                <label htmlFor="">{phone}</label>
              </span>
            </div>
            <div className="userShowInfo">
              <HomeOutlined className="userShowIcon" />
              <span className="userShowInfoTitle" placeholder="not set yet">
                <label placeholder="not set yet">{address}</label>
              </span>
            </div>
          </div>
        </div>

        <div className="userUpdate">
          <span className="userUpdateTitle">Edit Details</span>
          <br />
          <Form
            {...formItemLayout}
            form={form}
            name="editProfile"
            onFinish={(values) => {
              console.log({ values });
            }}
            scrollToFirstError
          >
            <Form.Item
              name="Username"
              label="Username"
              hasFeedback
              rules={[
                {
                  type: "name",
                  message: "The input is not valid Name!",
                },
                {
                  required: true,
                  message: "Please input your Username!",
                },
                {
                  whitespace: true,
                  min: 3,
                },
              ]}
            >
              <Input
                placeholder="Jon"
                label="UserName"
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Item>

            {/* <Form.Item
              name="email"
              label="E-mail"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please input your Email!",
                },
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
              ]}
            >
              <Input
                placeholder="something@gmail.com"
                label="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item> */}

            <Form.Item
              name="phone"
              label="Phone Number"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please input your Phone Number!",
                },
                {
                  pattern: /^(?:7|0|(?:\+94))[0-9]{9}$/,
                  message: "Phone number is not valid!",
                },
              ]}
            >
              <Input
                placeholder="0775680041"
                label="Phone"
                type="text"
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              name="dob"
              label="Dob"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please input your Birthday!",
                },
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
                picker="date"
                placeholder="Choose Birthday"
                onChange={(date) => setDob(date)}
              />
            </Form.Item>

            <Form.Item
              name="address"
              label="Address"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please input your Address!",
                },
                {
                  whitespace: true,
                  min: 3,
                },
              ]}
            >
              <Input
                placeholder="Address"
                label="Address"
                type="text"
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <DetailsSubmit />
            </Form.Item>
          </Form>
        </div>
      </div>

      <div className="userContainer">
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit Password</span>
          <Form
            {...formItemLayout}
            form={form}
            name="edit-password"
            onFinish={(values) => {
              console.log({ values });
            }}
            scrollToFirstError
          >
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
                {
                  required: true,
                  pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                  message:
                    "Password does not match criteria! (Must have 8 characters, include numbers, simple letters, capital letters)",
                },
              ]}
              hasFeedback
            >
              <Input.Password
                label="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password onChange={(e) => setRePassword(e.target.value)} />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <PasswordSubmit />
            </Form.Item>
          </Form>
        </div>

        <div className="userUpdate">
          <span className="userUpdateTitle">Edit Email</span>
          <Form
            {...formItemLayout}
            form={form}
            name="edit-email"
            onFinish={(values) => {
              console.log({ values });
            }}
            scrollToFirstError
          >
            <Form.Item
              name="email"
              label="E-mail"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please input your Email!",
                },
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
              ]}
            >
              <Input
                placeholder="something@gmail.com"
                label="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <EmailSubmit />
            </Form.Item>
          </Form>
        </div>
      </div>

      <div className="userContainer">
        <div className="userShow">
          <div className="userUpdateRight">
            <div className="userUpdateUpload">
              {values.imageSrc && (
                <img
                  src={values.imageSrc}
                  alt="Preview"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              )}

              {/* <label htmlFor="file">
                <UploadOutlined className="userUpdateIcon" />
              </label> */}
              <input
                type="file"
                accept="image/*"
                onChange={showPreview}
                className={"form-control-file" + applyErrorClass("imageSrc")}
              />
            </div>
            <br />
            <br />
            <Button
              className="userUpdateButton"
              type="primary"
              htmlType="submit"
              onClick={(e) => handleSaveImage(e)}
            >
              Upload Image
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
