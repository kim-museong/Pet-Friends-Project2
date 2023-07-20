import {Box, useTheme} from "@mui/material";
import Header from "../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {tokens} from "../theme";

const FAQ = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box m="20px">
            <Header title="질문&답변" subtitle="자주 묻는 질문과 답변"/>

            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography color={colors.greenAccent[500]} variant="h5">
                        자주 묻는 질문
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        자주 물어보는 질문 1
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography color={colors.greenAccent[500]} variant="h5">
                        자주 묻는 질문 2
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        자주 물어보는 질문 2
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography color={colors.greenAccent[500]} variant="h5">
                        자주 묻는 질문 3
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        자주 물어보는 질문 3
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography color={colors.greenAccent[500]} variant="h5">
                        자주 묻는 질문 4
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        자주 물어보는 질문 4
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography color={colors.greenAccent[500]} variant="h5">
                        자주 묻는 질문 5
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        자주 물어보는 질문 5
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

export default FAQ;
