"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SettingsPage() {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "My Restaurant",
    contactEmail: "contact@restaurant.com",
    phoneNumber: "+1 (555) 123-4567",
    address: "123 Main Street, City, State, 12345",
    timezone: "America/New_York",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    newUserNotifications: true,
    newOrderNotifications: true,
    systemUpdates: false,
    marketingEmails: false,
  });

  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: "light",
    accentColor: "blue",
    menuLayout: "grid",
    animationsEnabled: true,
  });

  const [integrationSettings, setIntegrationSettings] = useState({
    googleAnalyticsId: "",
    facebookPixelId: "",
    mailchimpApiKey: "",
    stripePublicKey: "",
    stripeSecretKey: "",
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    passwordExpiry: "90days",
    sessionTimeout: "30min",
    ipRestriction: false,
  });

  // Handle form submissions for each settings category

  const handleGeneralSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("Saving general settings:", generalSettings);
    // Here you would typically save to your backend
    alert("General settings saved successfully!");
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface NotificationSettings {
    emailNotifications: boolean;
    newUserNotifications: boolean;
    newOrderNotifications: boolean;
    systemUpdates: boolean;
    marketingEmails: boolean;
  }

  const handleNotificationSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ): void => {
    e.preventDefault();
    console.log("Saving notification settings:", notificationSettings);
    alert("Notification settings saved successfully!");
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface AppearanceSettings {
    theme: string;
    accentColor: string;
    menuLayout: string;
    animationsEnabled: boolean;
  }

  const handleAppearanceSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ): void => {
    e.preventDefault();
    console.log("Saving appearance settings:", appearanceSettings);
    alert("Appearance settings saved successfully!");
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface IntegrationSettings {
    googleAnalyticsId: string;
    facebookPixelId: string;
    mailchimpApiKey: string;
    stripePublicKey: string;
    stripeSecretKey: string;
  }

  const handleIntegrationSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ): void => {
    e.preventDefault();
    console.log("Saving integration settings:", integrationSettings);
    alert("Integration settings saved successfully!");
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface SecuritySettings {
    twoFactorAuth: boolean;
    passwordExpiry: string;
    sessionTimeout: string;
    ipRestriction: boolean;
  }

  const handleSecuritySubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("Saving security settings:", securitySettings);
    alert("Security settings saved successfully!");
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure the basic information for your restaurant website.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleGeneralSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={generalSettings.siteName}
                    onChange={(e) =>
                      setGeneralSettings({
                        ...generalSettings,
                        siteName: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={generalSettings.contactEmail}
                    onChange={(e) =>
                      setGeneralSettings({
                        ...generalSettings,
                        contactEmail: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    value={generalSettings.phoneNumber}
                    onChange={(e) =>
                      setGeneralSettings({
                        ...generalSettings,
                        phoneNumber: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={generalSettings.address}
                    onChange={(e) =>
                      setGeneralSettings({
                        ...generalSettings,
                        address: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={generalSettings.timezone}
                    onValueChange={(value) =>
                      setGeneralSettings({
                        ...generalSettings,
                        timezone: value,
                      })
                    }
                  >
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">
                        Eastern Time (ET)
                      </SelectItem>
                      <SelectItem value="America/Chicago">
                        Central Time (CT)
                      </SelectItem>
                      <SelectItem value="America/Denver">
                        Mountain Time (MT)
                      </SelectItem>
                      <SelectItem value="America/Los_Angeles">
                        Pacific Time (PT)
                      </SelectItem>
                      <SelectItem value="Europe/London">
                        Greenwich Mean Time (GMT)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Save Changes</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Control which notifications you receive from the system.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleNotificationSubmit}>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emailNotifications">
                      Email Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Enable or disable all email notifications
                    </p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        emailNotifications: checked,
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="newUserNotifications">
                      New User Registrations
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when a new user registers
                    </p>
                  </div>
                  <Switch
                    id="newUserNotifications"
                    checked={notificationSettings.newUserNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        newUserNotifications: checked,
                      })
                    }
                    disabled={!notificationSettings.emailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="newOrderNotifications">New Orders</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when a new order is placed
                    </p>
                  </div>
                  <Switch
                    id="newOrderNotifications"
                    checked={notificationSettings.newOrderNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        newOrderNotifications: checked,
                      })
                    }
                    disabled={!notificationSettings.emailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="systemUpdates">System Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified about system updates and maintenance
                    </p>
                  </div>
                  <Switch
                    id="systemUpdates"
                    checked={notificationSettings.systemUpdates}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        systemUpdates: checked,
                      })
                    }
                    disabled={!notificationSettings.emailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="marketingEmails">Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive marketing and promotional emails
                    </p>
                  </div>
                  <Switch
                    id="marketingEmails"
                    checked={notificationSettings.marketingEmails}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        marketingEmails: checked,
                      })
                    }
                    disabled={!notificationSettings.emailNotifications}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Save Changes</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize how your dashboard looks and feels.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleAppearanceSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select
                    value={appearanceSettings.theme}
                    onValueChange={(value) =>
                      setAppearanceSettings({
                        ...appearanceSettings,
                        theme: value,
                      })
                    }
                  >
                    <SelectTrigger id="theme">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System Default</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accentColor">Accent Color</Label>
                  <Select
                    value={appearanceSettings.accentColor}
                    onValueChange={(value) =>
                      setAppearanceSettings({
                        ...appearanceSettings,
                        accentColor: value,
                      })
                    }
                  >
                    <SelectTrigger id="accentColor">
                      <SelectValue placeholder="Select accent color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="green">Green</SelectItem>
                      <SelectItem value="red">Red</SelectItem>
                      <SelectItem value="purple">Purple</SelectItem>
                      <SelectItem value="orange">Orange</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="menuLayout">Menu Layout</Label>
                  <Select
                    value={appearanceSettings.menuLayout}
                    onValueChange={(value) =>
                      setAppearanceSettings({
                        ...appearanceSettings,
                        menuLayout: value,
                      })
                    }
                  >
                    <SelectTrigger id="menuLayout">
                      <SelectValue placeholder="Select menu layout" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grid">Grid</SelectItem>
                      <SelectItem value="list">List</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="animationsEnabled">Enable Animations</Label>
                    <p className="text-sm text-muted-foreground">
                      Toggle interface animations on or off
                    </p>
                  </div>
                  <Switch
                    id="animationsEnabled"
                    checked={appearanceSettings.animationsEnabled}
                    onCheckedChange={(checked) =>
                      setAppearanceSettings({
                        ...appearanceSettings,
                        animationsEnabled: checked,
                      })
                    }
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Save Changes</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        {/* Integration Settings */}
        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Integration Settings</CardTitle>
              <CardDescription>
                Connect your restaurant website with third-party services.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleIntegrationSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
                  <Input
                    id="googleAnalyticsId"
                    value={integrationSettings.googleAnalyticsId}
                    onChange={(e) =>
                      setIntegrationSettings({
                        ...integrationSettings,
                        googleAnalyticsId: e.target.value,
                      })
                    }
                    placeholder="UA-XXXXXXXXX-X or G-XXXXXXXXXX"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="facebookPixelId">Facebook Pixel ID</Label>
                  <Input
                    id="facebookPixelId"
                    value={integrationSettings.facebookPixelId}
                    onChange={(e) =>
                      setIntegrationSettings({
                        ...integrationSettings,
                        facebookPixelId: e.target.value,
                      })
                    }
                    placeholder="XXXXXXXXXXXXXXXXXX"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mailchimpApiKey">Mailchimp API Key</Label>
                  <Input
                    id="mailchimpApiKey"
                    value={integrationSettings.mailchimpApiKey}
                    onChange={(e) =>
                      setIntegrationSettings({
                        ...integrationSettings,
                        mailchimpApiKey: e.target.value,
                      })
                    }
                    placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-us1"
                    type="password"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stripePublicKey">Stripe Public Key</Label>
                  <Input
                    id="stripePublicKey"
                    value={integrationSettings.stripePublicKey}
                    onChange={(e) =>
                      setIntegrationSettings({
                        ...integrationSettings,
                        stripePublicKey: e.target.value,
                      })
                    }
                    placeholder="pk_xxxxxxxxxxxxxxxxxxxxxxxx"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stripeSecretKey">Stripe Secret Key</Label>
                  <Input
                    id="stripeSecretKey"
                    value={integrationSettings.stripeSecretKey}
                    onChange={(e) =>
                      setIntegrationSettings({
                        ...integrationSettings,
                        stripeSecretKey: e.target.value,
                      })
                    }
                    placeholder="sk_xxxxxxxxxxxxxxxxxxxxxxxx"
                    type="password"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Save Changes</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure security settings for your restaurant website.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSecuritySubmit}>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="twoFactorAuth">
                      Two-Factor Authentication
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Require two-factor authentication for admin accounts
                    </p>
                  </div>
                  <Switch
                    id="twoFactorAuth"
                    checked={securitySettings.twoFactorAuth}
                    onCheckedChange={(checked) =>
                      setSecuritySettings({
                        ...securitySettings,
                        twoFactorAuth: checked,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passwordExpiry">Password Expiry</Label>
                  <Select
                    value={securitySettings.passwordExpiry}
                    onValueChange={(value) =>
                      setSecuritySettings({
                        ...securitySettings,
                        passwordExpiry: value,
                      })
                    }
                  >
                    <SelectTrigger id="passwordExpiry">
                      <SelectValue placeholder="Select password expiry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30days">30 Days</SelectItem>
                      <SelectItem value="60days">60 Days</SelectItem>
                      <SelectItem value="90days">90 Days</SelectItem>
                      <SelectItem value="180days">180 Days</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout</Label>
                  <Select
                    value={securitySettings.sessionTimeout}
                    onValueChange={(value) =>
                      setSecuritySettings({
                        ...securitySettings,
                        sessionTimeout: value,
                      })
                    }
                  >
                    <SelectTrigger id="sessionTimeout">
                      <SelectValue placeholder="Select session timeout" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15min">15 Minutes</SelectItem>
                      <SelectItem value="30min">30 Minutes</SelectItem>
                      <SelectItem value="1hour">1 Hour</SelectItem>
                      <SelectItem value="4hours">4 Hours</SelectItem>
                      <SelectItem value="8hours">8 Hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="ipRestriction">IP Restriction</Label>
                    <p className="text-sm text-muted-foreground">
                      Limit admin access to specific IP addresses
                    </p>
                  </div>
                  <Switch
                    id="ipRestriction"
                    checked={securitySettings.ipRestriction}
                    onCheckedChange={(checked) =>
                      setSecuritySettings({
                        ...securitySettings,
                        ipRestriction: checked,
                      })
                    }
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Save Changes</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
