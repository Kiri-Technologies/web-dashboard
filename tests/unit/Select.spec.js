import { mount } from "@vue/test-utils";
import Select from "@/components/atoms/forms/Select.vue";

describe("Select.vue", () => {
  // Check input
  it("renders select input", async () => {
    const props = {
      label: "Arah",
      formName: "arah",
      message: "pilih arah",
      isReadonly: false,
      isRequired: true,
      options: [
        {
          value: "Arah 1",
          name: "Arah 1",
        },
        {
          value: "Arah 2",
          name: "Arah 2",
        },
      ],
      disabledOption: "pilih...",
      idCode: "arah",
      defaultValue: "",
    };

    const wrapper = mount(Select, {
      props,
    });

    expect(wrapper.html()).toContain("pilih...");
    expect(wrapper.html()).toContain("pilih arah");
    expect(wrapper.html()).toContain('Arah');
    

    const select = wrapper.find("select");

    await select.setValue("Arah 1");

    await select.trigger("change");

    expect(select.element.value).toBe("Arah 1");
    expect(select.element.required).toBe(true);
  });

  // Check emit
  it("check does the component emits after filling up the form", async () => {
    const props = {
      label: "Arah",
      formName: "arah",
      message: "pilih arah",
      isReadonly: false,
      isRequired: true,
      options: [
        {
          value: "Arah 1",
          name: "Arah 1",
        },
        {
          value: "Arah 2",
          name: "Arah 2",
        },
      ],
      disabledOption: "pilih...",
      idCode: "arah",
      defaultValue: "",
    };

    const wrapper = mount(Select, {
      props,
    });

    const select = wrapper.find("select");

    // select.element.value = "Arah 2";
    await select.setValue("Arah 2");

    await select.trigger("change");

    expect(wrapper.emitted()).toHaveProperty("formChange");
    expect(wrapper.emitted()).toHaveProperty("formIsValid");

    const formChangeEvent = wrapper.emitted("formChange");
    const formIsValidEvent = wrapper.emitted("formIsValid");

    expect(formChangeEvent[0]).toEqual(["Arah 2"]);
    expect(formIsValidEvent[0]).toEqual([true]);
  });
});
