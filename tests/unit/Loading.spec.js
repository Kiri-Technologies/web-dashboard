import { mount } from "@vue/test-utils";
import Loading from "@/components/atoms/loading/Loading.vue";

// Check nampilin label
describe("Loading.vue", () => {
  it("renders loading component", async () => {
    const wrapper = mount(Loading);

    expect(wrapper.html()).toContain("Loading data...");

    const button = wrapper.find("button");

    expect(button.element.classList.contains("loading")).toBe(true);
  });
});