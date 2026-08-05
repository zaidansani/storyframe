import LineChart from "@/components/charts/LineChart.astro";
import BarChart from "@/components/charts/BarChart.astro";
import PieChart from "@/components/charts/PieChart.astro";
import DoughnutChart from "@/components/charts/DoughnutChart.astro";
import RadarChart from "@/components/charts/RadarChart.astro";
import PolarAreaChart from "@/components/charts/PolarAreaChart.astro";
import ScatterChart from "@/components/charts/ScatterChart.astro";
import BubbleChart from "@/components/charts/BubbleChart.astro";
import MultipleChoice from "@/components/questions/MultipleChoice.astro";
import MultipleResponse from "@/components/questions/MultipleResponse.astro";
import FillInTheBlank from "@/components/questions/FillInTheBlank.astro";
import Accordion from "@/components/containers/Accordion.astro";

export const sectionRegistry = {
    LineChart,
    BarChart,
    PieChart,
    DoughnutChart,
    RadarChart,
    PolarAreaChart,
    ScatterChart,
    BubbleChart,
    MultipleChoice,
    MultipleResponse,
    FillInTheBlank,
    Accordion,
};
