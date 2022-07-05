import { mount } from "@vue/test-utils";
import InformationSection from "@/components/atoms/information/InformationSection.vue";

// Check nampilin label
describe("InformationSection.vue", () => {
  it("renders information section component", async () => {
    const props = {
      label: "User id",
      data: "user-123456"
    };

    const wrapper = mount(InformationSection, {
      props,
    });

    expect(wrapper.html()).toContain("User id");
    expect(wrapper.html()).toContain("user-123456");
  });
});