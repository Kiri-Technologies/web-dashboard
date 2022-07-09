import { mount } from "@vue/test-utils";
import ButtonPrimary from "@/components/atoms/buttons/ButtonPrimary.vue";
import ButtonDanger from "@/components/atoms/buttons/ButtonDanger.vue";
import ButtonSuccess from "@/components/atoms/buttons/ButtonSuccess.vue";
import ButtonWarning from "@/components/atoms/buttons/ButtonWarning.vue";

describe("ButtonPrimary.vue", () => {
  it("renders button primary", () => {
    const props = {
      link: false,
      size: "sm",
    };
    const wrapper = mount(ButtonPrimary, {
      props,
      slots: {
        default: "Submit"
      },
      global: {
        stubs: {
          "router-link": {
            template: "<a />",
          },
        },
      },
    });

    expect(wrapper.find("button").exists()).toBe(true);
    expect(wrapper.find("button").classes()).toContain("btn-sm");
    expect(wrapper.html()).toContain('Submit');
  });
});

describe("ButtonDanger.vue", () => {
  it("renders button danger", () => {
    const props = {
      link: false,
      size: "sm",
    };
    const wrapper = mount(ButtonDanger, {
      props,
      slots: {
        default: "Submit"
      },
      global: {
        stubs: {
          "router-link": {
            template: "<a />",
          },
        },
      },
    });

    expect(wrapper.find("button").exists()).toBe(true);
    expect(wrapper.find("button").classes()).toContain("btn-sm");
    expect(wrapper.html()).toContain('Submit');
  });
});

describe("ButtonSuccess.vue", () => {
  it("renders button success", () => {
    const props = {
      link: false,
      size: "sm",
    };
    const wrapper = mount(ButtonSuccess, {
      props,
      slots: {
        default: "Submit"
      },
      global: {
        stubs: {
          "router-link": {
            template: "<a />",
          },
        },
      },
    });

    expect(wrapper.find("button").exists()).toBe(true);
    expect(wrapper.find("button").classes()).toContain("btn-sm");
    expect(wrapper.html()).toContain('Submit');
  });
});

describe("ButtonWarning.vue", () => {
  it("renders button warning", () => {
    const props = {
      link: false,
      size: "sm",
    };
    const wrapper = mount(ButtonWarning, {
      props,
      slots: {
        default: "Submit"
      },
      global: {
        stubs: {
          "router-link": {
            template: "<a />",
          },
        },
      },
    });

    expect(wrapper.find("button").exists()).toBe(true);
    expect(wrapper.find("button").classes()).toContain("btn-sm");
    expect(wrapper.html()).toContain('Submit');
  });
});
