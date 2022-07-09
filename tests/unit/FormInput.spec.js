import { mount } from "@vue/test-utils";
import FormInput from "@/components/atoms/forms/FormInput.vue";

describe("FormInput.vue", () => {
  // check apakah form terisi dari props
  it("renders default text form", async () => {
    const props = {
      label: "Name",
      placeholder: "name",
      formName: "name",
      isReadonly: false,
      isRequired: true,
      type: "text",
      idCode: "name",
    };

    const wrapper = mount(FormInput, {
      props,
    });

    const input = wrapper.find("input");

    await input.setValue("John Doe");

    expect(wrapper.html()).toContain('Name');
    expect(input.element.placeholder).toBe("name");
    expect(input.element.readOnly).toBe(false);
    expect(input.element.required).toBe(true);
    expect(input.element.value).toBe("John Doe");
  });

  // check apakah pesan error muncul saat form kosong
  it("renders error message when form is empty", async () => {
    const props = {
      label: "Name",
      placeholder: "name",
      formName: "name",
      isReadonly: false,
      isRequired: true,
      type: "text",
      idCode: "name",
    };

    const wrapper = mount(FormInput, {
      props,
    });

    const input = wrapper.find("input");

    await input.setValue("");

    await input.trigger('blur')

    expect(input.element.classList.contains("input-error")).toBe(true);
    expect(input.element.value).toBe("");
    expect(wrapper.html()).toContain(
      `Please enter a correct ${props.formName}`
    );
  });

  // check validasi email
  it("renders error message when email is incorrect", async () => {
    const props = {
      label: "Email",
      placeholder: "Email",
      formName: "email",
      isReadonly: false,
      isRequired: true,
      idCode: "email",
      type: "email",
    };

    const wrapper = mount(FormInput, {
      props,
    });

    const input = wrapper.find("input");

    await input.setValue("johndoe");

    await input.trigger('blur')

    expect(input.element.classList.contains("input-error")).toBe(true);
    expect(input.element.value).toBe("johndoe");
    expect(wrapper.html()).toContain(
      `Please enter a valid email address`
    );
  });

  // check validasi latitude
  it("renders error message when latitude is incorrect", async () => {
    const props = {
      label: "Latitude",
      placeholder: "Latitude",
      formName: "latitude",
      isReadonly: false,
      isRequired: true,
      type: "text",
      idCode: "latitude",
      mode: 'lat'
    };

    const wrapper = mount(FormInput, {
      props,
    });

    const input = wrapper.find("input");

    await input.setValue("this is not a latitude");

    await input.trigger('blur')

    expect(input.element.classList.contains("input-error")).toBe(true);
    expect(input.element.value).toBe("this is not a latitude");
    expect(wrapper.html()).toContain(
      `Please enter a correct latitude`
    );
  });

  // check validasi longitude
  it("renders error message when longitude is incorrect", async () => {
    const props = {
      label: "Longitude",
      placeholder: "Longitude",
      formName: "longitude",
      isReadonly: false,
      isRequired: true,
      type: "text",
      idCode: "longitude",
      mode: 'long'
    };

    const wrapper = mount(FormInput, {
      props,
    });

    const input = wrapper.find("input");

    await input.setValue("this is not a longitude");

    await input.trigger('blur')

    expect(input.element.classList.contains("input-error")).toBe(true);
    expect(input.element.value).toBe("this is not a longitude");
    expect(wrapper.html()).toContain(
      `Please enter a correct longitude`
    );
  });

  // check emit
  it("check does the component emits after filling up the form", async () => {
    const props = {
      label: "Name",
      placeholder: "name",
      formName: "name",
      isReadonly: false,
      isRequired: true,
      idCode: "name",
      type: "text",
    };

    const wrapper = mount(FormInput, {
      props,
    });

    const input = wrapper.find("input");

    await input.setValue("John doe");

    await input.trigger('input')

    expect(wrapper.emitted()).toHaveProperty('formChange');
    expect(wrapper.emitted()).toHaveProperty('formIsValid');

    const formChangeEvent = wrapper.emitted('formChange');
    const formIsValidEvent = wrapper.emitted('formIsValid');

    expect(formChangeEvent[0]).toEqual(['John doe']);
    expect(formIsValidEvent[0]).toEqual([true]);
  });
});