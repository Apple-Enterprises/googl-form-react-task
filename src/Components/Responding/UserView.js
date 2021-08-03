import React from "react";
import { Grid } from "@material-ui/core";
import { Paper, Typography } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import RadioGroup from "@material-ui/core/RadioGroup";
import Divider from "@material-ui/core/Divider";

function UserView(props) {
  const { getFromStorage, setInStorage } = window;
  const [formData, setFormData] = React.useState({});
  const [responseData, setResponseData] = React.useState([]);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const [questions, setQuestions] = React.useState([]);
  // React.useEffect(() => {
  //   Math.random().toString(36).substring(2, 15);
  // }, []);

  const handleRadioChange = (j, i) => {
    var data = {
      question: i,
      option: j,
    };
    const quesIdx = responseData.findIndex((q) => q.question === i);
    console.log("ques: ", quesIdx);
    let newResponseData = responseData;
    if (quesIdx !== -1) {
      newResponseData[quesIdx].option = j;
    } else {
      newResponseData = [...responseData, data];
    }
    setResponseData([...newResponseData]);
  };

  React.useEffect(() => {
    var formId = props.match.params.formId;
    const data = getFromStorage(`formData${formId}`);
    setFormData(data);
    setQuestions(data.questions);
  }, [props.match.params.formId]);

  function submitResponse() {
    var submissionData = {
      formId: formData.id,
      response: responseData,
    };
    console.log(submissionData);
    setIsSubmitted(true);
  }

  function reloadForAnotherResponse() {
    window.location.reload(true);
  }

  return (
    <div style={{ minHeight: "100vh" }}>
      <div>
        <AppBar position="static" style={{ backgroundColor: "teal" }}>
          <Toolbar>
            <Typography variant="h6" style={{}}>
              Forms
            </Typography>
          </Toolbar>
        </AppBar>
        <br></br>

        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item xs={12} sm={5} style={{ width: "100%" }}>
            <Grid style={{ borderTop: "10px solid teal", borderRadius: 10 }}>
              <div>
                <div>
                  <Paper elevation={2} style={{ width: "100%" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        marginLeft: "15px",
                        paddingTop: "20px",
                        paddingBottom: "20px",
                      }}
                    >
                      <Typography
                        variant="h4"
                        style={{
                          fontFamily: "sans-serif Roboto",
                          marginBottom: "15px",
                        }}
                      >
                        {formData.name}
                      </Typography>
                      <Typography variant="subtitle1">
                        {formData.description}
                      </Typography>
                    </div>
                  </Paper>
                </div>
              </div>
            </Grid>

            {!isSubmitted ? (
              <div>
                <Grid>
                  {questions.map((ques, i) => (
                    <div key={i}>
                      <br></br>
                      <Paper>
                        <div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              marginLeft: "6px",
                              paddingTop: "15px",
                              paddingBottom: "15px",
                            }}
                          >
                            <Typography
                              variant="subtitle1"
                              style={{ marginLeft: "10px" }}
                            >
                              {i + 1}. {ques.questionText}
                            </Typography>
                            <div>
                              <RadioGroup
                                aria-label="quiz"
                                name="quiz"
                                value={(() => {
                                  if (responseData && responseData.length) {
                                    const resp = responseData[i];
                                    console.log("resp: ", resp);
                                    return resp ? Number(resp.option) : null;
                                  } else {
                                    return null;
                                  }
                                })()}
                                onChange={(e) => {
                                  console.log(
                                    "e.target.value: ",
                                    e.target.value
                                  );
                                  handleRadioChange(e.target.value, i);
                                }}
                              >
                                {ques.options.map((op, j) => (
                                  <div key={j}>
                                    <div
                                      style={{
                                        display: "flex",
                                        marginLeft: "7px",
                                      }}
                                    >
                                      <FormControlLabel
                                        value={j}
                                        control={<Radio />}
                                        label={op.optionText}
                                      />
                                    </div>

                                    <div
                                      style={{
                                        display: "flex",
                                        marginLeft: "10px",
                                      }}
                                    >
                                      <Divider />
                                    </div>
                                  </div>
                                ))}
                              </RadioGroup>
                            </div>
                          </div>
                        </div>
                      </Paper>
                    </div>
                  ))}
                </Grid>
                <Grid>
                  <br></br>
                  <div style={{ display: "flex" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={submitResponse}
                    >
                      Submit
                    </Button>
                  </div>
                  <br></br>

                  <br></br>
                </Grid>
              </div>
            ) : (
              <div>
                <Typography variant="body1">Form submitted</Typography>
                <Typography variant="body2">
                  Thanks for submiting form
                </Typography>

                <Button onClick={reloadForAnotherResponse}>
                  Submit another response
                </Button>
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default UserView;

const FormControlLabelWrapper = (props) => {
  const { radioButton, ...labelProps } = props;
  return (
    <FormControlLabel
      control={<Radio />}
      label={"Radio " + props.value + props.jIndex}
      {...labelProps}
    />
  );
};
