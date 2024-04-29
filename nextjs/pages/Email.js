<form onSubmit={isNewEmail}>
          <label>
            Email:
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
          </label>
          <button type="submit">Next</button>
</form>

<form onSubmit={isNewEmail}>
  <head>
    <title>Simple login form</title>
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet">
    <style>
      html, body {
      display: flex;
      justify-content: center;
      background-color:rgb(31 41 55);
      color: white;
      font-family: Roboto, Arial, sans-serif;
      font-size: 15px;
      }
      form {
      border: 5px solid "#f1f1f1";
      }
      input[type=text], input[type=password] {
      width: 100%;
      padding: 16px 8px;
      margin: 8px 0;
      display: inline-block;
      border: 1px solid #ccc;
      box-sizing: border-box;
      }
      button {
      background-color: white;
      color:  black;
      padding: 14px 0;
      margin: 10px 0;
      border: none;
      cursor: grabbing;
      width: 100%;
      }
      h1 {
      text-align:center;
      fone-size:18;
      }
      button:hover {
      opacity: 0.8;
      }
      .formcontainer {
      text-align: left;
      margin: 24px 50px 12px;
      }
      .container {
      padding: 16px 0;
      text-align:left;
      }
      span.psw {
      float: right;
      padding-top: 0;
      padding-right: 15px;
      }
      /* Change styles for span on extra small screens */
      @media screen and (max-width: 300px) {
      span.psw {
      display: block;
      float: none;
      }
    </style>
  </head>
  <body>
    <form action="/action_page.php">
      <h1>Login</h1>
      <div class="formcontainer">
      <hr/>
      <div class="container">
        <label for="psw"><strong>Email</strong></label>
        <input type="email" placeholder="Enter Email" value={email} name = "psw" onChange={e => setEmail(e.target.value)} required/>
      </div>
      <a
                className="transition duration-700 inline-flex items-center px-5 py-3 text-medium font-medium text-gray-300 text-xl transition duration-300 bg-black rounded hover:bg-gray-800 dark:hover:bg-gray-200 dark:text-gray-700 dark:bg-white hover:transform hover:scale-125"
                aria-label="learn more"
                rel="noreferrer"
                href="https://github.com/minor/plutonium/"
              >
                {/* <div className="flex justify-center">
                  <img
                    className="transition duration-700 rounded-xl ring-1 ring-black ring-opacity-5 hover:transform hover:scale-105"
                    src="/next.svg"
                    alt="Placeholder Image"
                    width="350"
                  />
                </div> */}
                <span className="flex justify-center">LOG IN</span>
              </a>
      <button type="submit">Next</button>
    </form>
  </body>
  
</form>