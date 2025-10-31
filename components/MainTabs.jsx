import { Tabs, Tab, Card, CardBody } from "@heroui/react";

export default function MainTabs() {
    return (
        <div className="flex w-full flex-col items-center justify-center">
            <Tabs aria-label="Main options" variant="underlined">
                <Tab key="kitchen" title="Кухня">
                    <Card>
                        <CardBody>Кухня</CardBody>
                    </Card>
                </Tab>
                <Tab key="supply" title="Забезпечення">
                    <Card>
                        <CardBody>Забезпечення</CardBody>
                    </Card>
                </Tab>
            </Tabs>
        </div>

    );
}