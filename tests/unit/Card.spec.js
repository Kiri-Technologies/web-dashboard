import { mount } from "@vue/test-utils";
import Card from "@/components/atoms/card/Card.vue";
import CardBody from "@/components/atoms/card/CardBody.vue";

describe("Card.vue", () => {
  it("renders card", () => {
    const wrapper = mount(Card, {
      slots: {
        default: "<div class='card-body'>This is a card</div>",
      },
    });

    expect(wrapper.html()).toContain("This is a card");
  });
});

describe("CardBody.vue", () => {
  it("renders card body", () => {
    const wrapper = mount(CardBody, {
      slots: {
        default: "This is a card body",
      },
    });

    expect(wrapper.html()).toContain("This is a card body");
  });
});
