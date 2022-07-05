import { mount } from "@vue/test-utils";
import Checkbox from "@/components/atoms/forms/Checkbox.vue";

describe("Checkbox.vue", () => {
  // Check nampilin label
  it("renders checkbox", async () => {
    const props = {
      label: "Remember me",
    };

    const wrapper = mount(Checkbox, {
      props,
    });

    expect(wrapper.html()).toContain("Remember me");
  });

  // Check emit
  it("check does the component emits after filling up the form", async () => {
    const props = {
      label: "Remember me",
    };

    const wrapper = mount(Checkbox, {
      props,
    });

    const input = wrapper.find("input");

    await input.setValue(true);

    await input.trigger("change");

    expect(wrapper.emitted()).toHaveProperty("checkboxChange");

    const checkboxChangeEvent = wrapper.emitted("checkboxChange");

    expect(checkboxChangeEvent[0]).toEqual([true]);
  });
});
