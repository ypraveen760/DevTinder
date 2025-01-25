app.get("/admin/allData", async (req, res) => {
  const userData = await User.find({});
  res.send(userData);
});
//to delete by emailId
app.delete("/admin/deleteuser", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const userData = await User.findOne({ emailId: userEmail });

    if (!userData) {
      res.status(404).send("no user found");
    } else {
      const userid = userData.id;

      await User.deleteOne({ _id: userid });
      res.send("Data Deleted ");
    }
  } catch (err) {
    res.status(500).send("error occured");
  }
});
//to get user data by email id
app.get("/admin/userdata", async (req, res) => {
  const userEmail = req.body.emailId;
  if (!userEmail) {
    res.status(501).send("Give valid emailID");
  } else {
    try {
      const userData = await User.findOne({ emailId: userEmail });
      if (userData.length === 0) {
        res.status(404).send("user not found");
      } else {
        res.send(userData);
      }
    } catch (err) {
      res.status(501).send("Somthing Went Wrong" + err.message);
    }
  }
});
