"use client";
import { useState, useEffect } from "react";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Save, CheckCircle, AlertCircle } from "lucide-react";

interface GeneralSettings {
  siteName: string;
  contactEmail: string;
  phoneNumber: string;
  address: string;
  timezone: string;
  currency: string;
  taxRate: number;
}

interface NotificationSettings {
  emailNotifications: boolean;
  newUserNotifications: boolean;
  newOrderNotifications: boolean;
  systemUpdates: boolean;
  marketingEmails: boolean;
  smsNotifications: boolean;
  smsOrderUpdates: boolean;
  pushNotifications: boolean;
  pushOrderAlerts: boolean;
}

interface AppearanceSettings {
  theme: string;
  accentColor: string;
  menuLayout: string;
  animationsEnabled: boolean;
  logoUrl: string | null;
  faviconUrl: string | null;
  brandColor: string;
  showPrices: boolean;
  showDescription: boolean;
  showImages: boolean;
}

interface IntegrationSettings {
  googleAnalyticsId: string | null;
  facebookPixelId: string | null;
  mailchimpApiKey: string | null;
  mailchimpListId: string | null;
  stripePublicKey: string | null;
  stripeSecretKey: string | null;
  paypalClientId: string | null;
  facebookPageId: string | null;
  instagramUsername: string | null;
  twitterHandle: string | null;
  posSystemType: string | null;
  posApiKey: string | null;
}

interface SecuritySettings {
  twoFactorAuth: boolean;
  passwordExpiry: string;
  sessionTimeout: string;
  ipRestriction: boolean;
  loginAttempts: number;
  lockoutDuration: number;
  allowedIPs: string[];
  minPasswordLength: number;
  requireSpecialChars: boolean;
  requireNumbers: boolean;
  requireUppercase: boolean;
}

type LoadingState = {
  [key: string]: boolean;
};

type AlertState = {
  type: "success" | "error" | null;
  message: string;
};

export default function SettingsPage() {
  const [generalSettings, setGeneralSettings] = useState<GeneralSettings>({
    siteName: "",
    contactEmail: "",
    phoneNumber: "",
    address: "",
    timezone: "America/New_York",
    currency: "USD",
    taxRate: 0.08,
  });

  const [notificationSettings, setNotificationSettings] =
    useState<NotificationSettings>({
      emailNotifications: true,
      newUserNotifications: true,
      newOrderNotifications: true,
      systemUpdates: false,
      marketingEmails: false,
      smsNotifications: false,
      smsOrderUpdates: false,
      pushNotifications: true,
      pushOrderAlerts: true,
    });

  const [appearanceSettings, setAppearanceSettings] =
    useState<AppearanceSettings>({
      theme: "light",
      accentColor: "blue",
      menuLayout: "grid",
      animationsEnabled: true,
      logoUrl: null,
      faviconUrl: null,
      brandColor: "#3b82f6",
      showPrices: true,
      showDescription: true,
      showImages: true,
    });

  const [integrationSettings, setIntegrationSettings] =
    useState<IntegrationSettings>({
      googleAnalyticsId: null,
      facebookPixelId: null,
      mailchimpApiKey: null,
      mailchimpListId: null,
      stripePublicKey: null,
      stripeSecretKey: null,
      paypalClientId: null,
      facebookPageId: null,
      instagramUsername: null,
      twitterHandle: null,
      posSystemType: null,
      posApiKey: null,
    });

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactorAuth: false,
    passwordExpiry: "90days",
    sessionTimeout: "30min",
    ipRestriction: false,
    loginAttempts: 5,
    lockoutDuration: 30,
    allowedIPs: [],
    minPasswordLength: 8,
    requireSpecialChars: true,
    requireNumbers: true,
    requireUppercase: true,
  });

  const [loading, setLoading] = useState<LoadingState>({});
  const [alert, setAlert] = useState<AlertState>({ type: null, message: "" });
  const [initialLoad, setInitialLoad] = useState(true);

  // Load settings on component mount
  useEffect(() => {
    loadAllSettings();
  }, []);

  const loadAllSettings = async () => {
    setInitialLoad(true);
    try {
      await Promise.all([
        loadGeneralSettings(),
        loadNotificationSettings(),
        loadAppearanceSettings(),
        loadIntegrationSettings(),
        loadSecuritySettings(),
      ]);
    } catch (error) {
      console.error("Error loading settings:", error);
      showAlert("error", "Failed to load settings. Please refresh the page.");
    } finally {
      setInitialLoad(false);
    }
  };

  const loadGeneralSettings = async () => {
    try {
      const response = await fetch("/api/settings/general");
      if (!response.ok) throw new Error("Failed to load general settings");
      const data = await response.json();
      setGeneralSettings(data);
    } catch (error) {
      console.error("Error loading general settings:", error);
    }
  };

  const loadNotificationSettings = async () => {
    try {
      const response = await fetch("/api/settings/notifications");
      if (!response.ok) throw new Error("Failed to load notification settings");
      const data = await response.json();
      setNotificationSettings(data);
    } catch (error) {
      console.error("Error loading notification settings:", error);
    }
  };

  const loadAppearanceSettings = async () => {
    try {
      const response = await fetch("/api/settings/appearance");
      if (!response.ok) throw new Error("Failed to load appearance settings");
      const data = await response.json();
      setAppearanceSettings(data);
    } catch (error) {
      console.error("Error loading appearance settings:", error);
    }
  };

  const loadIntegrationSettings = async () => {
    try {
      const response = await fetch("/api/settings/integrations");
      if (!response.ok) throw new Error("Failed to load integration settings");
      const data = await response.json();
      setIntegrationSettings(data);
    } catch (error) {
      console.error("Error loading integration settings:", error);
    }
  };

  const loadSecuritySettings = async () => {
    try {
      const response = await fetch("/api/settings/security");
      if (!response.ok) throw new Error("Failed to load security settings");
      const data = await response.json();
      setSecuritySettings(data);
    } catch (error) {
      console.error("Error loading security settings:", error);
    }
  };

  const showAlert = (type: "success" | "error", message: string) => {
    setAlert({ type, message });
    setTimeout(() => setAlert({ type: null, message: "" }), 5000);
  };

  const handleGeneralSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading({ ...loading, general: true });

    try {
      const response = await fetch("/api/settings/general", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(generalSettings),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save settings");
      }

      const updatedSettings = await response.json();
      setGeneralSettings(updatedSettings);
      showAlert("success", "General settings saved successfully!");
    } catch (error) {
      console.error("Error saving general settings:", error);
      showAlert(
        "error",
        error instanceof Error
          ? error.message
          : "Failed to save general settings"
      );
    } finally {
      setLoading({ ...loading, general: false });
    }
  };

  const handleNotificationSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading({ ...loading, notifications: true });

    try {
      const response = await fetch("/api/settings/notifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notificationSettings),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save settings");
      }

      const updatedSettings = await response.json();
      setNotificationSettings(updatedSettings);
      showAlert("success", "Notification settings saved successfully!");
    } catch (error) {
      console.error("Error saving notification settings:", error);
      showAlert(
        "error",
        error instanceof Error
          ? error.message
          : "Failed to save notification settings"
      );
    } finally {
      setLoading({ ...loading, notifications: false });
    }
  };

  const handleAppearanceSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading({ ...loading, appearance: true });

    try {
      const response = await fetch("/api/settings/appearance", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appearanceSettings),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save settings");
      }

      const updatedSettings = await response.json();
      setAppearanceSettings(updatedSettings);
      showAlert("success", "Appearance settings saved successfully!");
    } catch (error) {
      console.error("Error saving appearance settings:", error);
      showAlert(
        "error",
        error instanceof Error
          ? error.message
          : "Failed to save appearance settings"
      );
    } finally {
      setLoading({ ...loading, appearance: false });
    }
  };

  const handleIntegrationSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading({ ...loading, integrations: true });

    try {
      const response = await fetch("/api/settings/integrations", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(integrationSettings),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save settings");
      }

      const updatedSettings = await response.json();
      setIntegrationSettings(updatedSettings);
      showAlert("success", "Integration settings saved successfully!");
    } catch (error) {
      console.error("Error saving integration settings:", error);
      showAlert(
        "error",
        error instanceof Error
          ? error.message
          : "Failed to save integration settings"
      );
    } finally {
      setLoading({ ...loading, integrations: false });
    }
  };

  const handleSecuritySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading({ ...loading, security: true });

    try {
      const response = await fetch("/api/settings/security", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(securitySettings),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save settings");
      }

      const updatedSettings = await response.json();
      setSecuritySettings(updatedSettings);
      showAlert("success", "Security settings saved successfully!");
    } catch (error) {
      console.error("Error saving security settings:", error);
      showAlert(
        "error",
        error instanceof Error
          ? error.message
          : "Failed to save security settings"
      );
    } finally {
      setLoading({ ...loading, security: false });
    }
  };

  if (initialLoad) {
    return (
      <div className="container mx-auto py-10 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading settings...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      {alert.type && (
        <Alert
          className={`mb-6 ${alert.type === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
        >
          {alert.type === "success" ? (
            <CheckCircle className="h-4 w-4 text-green-600" />
          ) : (
            <AlertCircle className="h-4 w-4 text-red-600" />
          )}
          <AlertDescription
            className={
              alert.type === "success" ? "text-green-800" : "text-red-800"
            }
          >
            {alert.message}
          </AlertDescription>
        </Alert>
      )}

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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      required
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
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      required
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
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select
                      value={generalSettings.currency}
                      onValueChange={(value) =>
                        setGeneralSettings({
                          ...generalSettings,
                          currency: value,
                        })
                      }
                    >
                      <SelectTrigger id="currency">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                        <SelectItem value="CAD">CAD (C$)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="taxRate">Tax Rate (%)</Label>
                    <Input
                      id="taxRate"
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                      value={generalSettings.taxRate * 100}
                      onChange={(e) =>
                        setGeneralSettings({
                          ...generalSettings,
                          taxRate: parseFloat(e.target.value) / 100,
                        })
                      }
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={loading.general}>
                  {loading.general ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
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
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emailNotifications">
                      Email Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Master switch for all email notifications
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Order Notifications</h4>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="newOrderNotifications">
                          New Orders
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Get notified when orders are placed
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
                        <Label htmlFor="smsOrderUpdates">
                          SMS Order Updates
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Send SMS updates to customers
                        </p>
                      </div>
                      <Switch
                        id="smsOrderUpdates"
                        checked={notificationSettings.smsOrderUpdates}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({
                            ...notificationSettings,
                            smsOrderUpdates: checked,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">User & System</h4>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="newUserNotifications">New Users</Label>
                        <p className="text-sm text-muted-foreground">
                          Notify when users register
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
                        <Label htmlFor="systemUpdates">System Updates</Label>
                        <p className="text-sm text-muted-foreground">
                          Updates and maintenance alerts
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
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="marketingEmails">Marketing Emails</Label>
                      <p className="text-sm text-muted-foreground">
                        Promotional and marketing content
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
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={loading.notifications}>
                  {loading.notifications ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
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
                Customize how your dashboard and customer-facing site look.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleAppearanceSubmit}>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <SelectItem value="grid">Grid View</SelectItem>
                        <SelectItem value="list">List View</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="brandColor">Brand Color</Label>
                    <Input
                      id="brandColor"
                      type="color"
                      value={appearanceSettings.brandColor}
                      onChange={(e) =>
                        setAppearanceSettings({
                          ...appearanceSettings,
                          brandColor: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Display Options</h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="showPrices">Show Prices</Label>
                        <p className="text-sm text-muted-foreground">
                          Display item prices on menu
                        </p>
                      </div>
                      <Switch
                        id="showPrices"
                        checked={appearanceSettings.showPrices}
                        onCheckedChange={(checked) =>
                          setAppearanceSettings({
                            ...appearanceSettings,
                            showPrices: checked,
                          })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="showImages">Show Images</Label>
                        <p className="text-sm text-muted-foreground">
                          Display item images
                        </p>
                      </div>
                      <Switch
                        id="showImages"
                        checked={appearanceSettings.showImages}
                        onCheckedChange={(checked) =>
                          setAppearanceSettings({
                            ...appearanceSettings,
                            showImages: checked,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="showDescription">Show Descriptions</Label>
                      <p className="text-sm text-muted-foreground">
                        Display item descriptions
                      </p>
                    </div>
                    <Switch
                      id="showDescription"
                      checked={appearanceSettings.showDescription}
                      onCheckedChange={(checked) =>
                        setAppearanceSettings({
                          ...appearanceSettings,
                          showDescription: checked,
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="animationsEnabled">
                        Enable Animations
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Smooth transitions and hover effects
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
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={loading.appearance}>
                  {loading.appearance ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
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
                Connect your restaurant with third-party services and platforms.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleIntegrationSubmit}>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Analytics & Tracking</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="googleAnalyticsId">
                        Google Analytics ID
                      </Label>
                      <Input
                        id="googleAnalyticsId"
                        value={integrationSettings.googleAnalyticsId || ""}
                        onChange={(e) =>
                          setIntegrationSettings({
                            ...integrationSettings,
                            googleAnalyticsId: e.target.value || null,
                          })
                        }
                        placeholder="G-XXXXXXXXXX"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="facebookPixelId">Facebook Pixel ID</Label>
                      <Input
                        id="facebookPixelId"
                        value={integrationSettings.facebookPixelId || ""}
                        onChange={(e) =>
                          setIntegrationSettings({
                            ...integrationSettings,
                            facebookPixelId: e.target.value || null,
                          })
                        }
                        placeholder="XXXXXXXXXXXXXXXXXX"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Payment Processing</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="stripePublicKey">Stripe Public Key</Label>
                      <Input
                        id="stripePublicKey"
                        value={integrationSettings.stripePublicKey || ""}
                        onChange={(e) =>
                          setIntegrationSettings({
                            ...integrationSettings,
                            stripePublicKey: e.target.value || null,
                          })
                        }
                        placeholder="pk_test_..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="stripeSecretKey">Stripe Secret Key</Label>
                      <Input
                        id="stripeSecretKey"
                        type="password"
                        value={integrationSettings.stripeSecretKey || ""}
                        onChange={(e) =>
                          setIntegrationSettings({
                            ...integrationSettings,
                            stripeSecretKey: e.target.value || null,
                          })
                        }
                        placeholder="sk_test_..."
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="paypalClientId">PayPal Client ID</Label>
                    <Input
                      id="paypalClientId"
                      value={integrationSettings.paypalClientId || ""}
                      onChange={(e) =>
                        setIntegrationSettings({
                          ...integrationSettings,
                          paypalClientId: e.target.value || null,
                        })
                      }
                      placeholder="ATl4xxxxxxxxxxx"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Email Marketing</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="mailchimpApiKey">Mailchimp API Key</Label>
                      <Input
                        id="mailchimpApiKey"
                        type="password"
                        value={integrationSettings.mailchimpApiKey || ""}
                        onChange={(e) =>
                          setIntegrationSettings({
                            ...integrationSettings,
                            mailchimpApiKey: e.target.value || null,
                          })
                        }
                        placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-us1"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mailchimpListId">Mailchimp List ID</Label>
                      <Input
                        id="mailchimpListId"
                        value={integrationSettings.mailchimpListId || ""}
                        onChange={(e) =>
                          setIntegrationSettings({
                            ...integrationSettings,
                            mailchimpListId: e.target.value || null,
                          })
                        }
                        placeholder="a1b2c3d4e5"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Social Media</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="facebookPageId">Facebook Page ID</Label>
                      <Input
                        id="facebookPageId"
                        value={integrationSettings.facebookPageId || ""}
                        onChange={(e) =>
                          setIntegrationSettings({
                            ...integrationSettings,
                            facebookPageId: e.target.value || null,
                          })
                        }
                        placeholder="123456789"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="instagramUsername">
                        Instagram Username
                      </Label>
                      <Input
                        id="instagramUsername"
                        value={integrationSettings.instagramUsername || ""}
                        onChange={(e) =>
                          setIntegrationSettings({
                            ...integrationSettings,
                            instagramUsername: e.target.value || null,
                          })
                        }
                        placeholder="@yourrestaurant"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="twitterHandle">Twitter Handle</Label>
                      <Input
                        id="twitterHandle"
                        value={integrationSettings.twitterHandle || ""}
                        onChange={(e) =>
                          setIntegrationSettings({
                            ...integrationSettings,
                            twitterHandle: e.target.value || null,
                          })
                        }
                        placeholder="@yourrestaurant"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">POS Integration</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="posSystemType">POS System Type</Label>
                      <Select
                        value={integrationSettings.posSystemType || ""}
                        onValueChange={(value) =>
                          setIntegrationSettings({
                            ...integrationSettings,
                            posSystemType: value || null,
                          })
                        }
                      >
                        <SelectTrigger id="posSystemType">
                          <SelectValue placeholder="Select POS system" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="square">Square</SelectItem>
                          <SelectItem value="toast">Toast</SelectItem>
                          <SelectItem value="clover">Clover</SelectItem>
                          <SelectItem value="lightspeed">Lightspeed</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="posApiKey">POS API Key</Label>
                      <Input
                        id="posApiKey"
                        type="password"
                        value={integrationSettings.posApiKey || ""}
                        onChange={(e) =>
                          setIntegrationSettings({
                            ...integrationSettings,
                            posApiKey: e.target.value || null,
                          })
                        }
                        placeholder="Enter API key"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={loading.integrations}>
                  {loading.integrations ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
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
                Configure security and access control for your restaurant
                system.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSecuritySubmit}>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Authentication</h4>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="twoFactorAuth">
                        Two-Factor Authentication
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Require 2FA for all admin accounts
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Login Security</h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="loginAttempts">Max Login Attempts</Label>
                      <Input
                        id="loginAttempts"
                        type="number"
                        min="1"
                        max="10"
                        value={securitySettings.loginAttempts}
                        onChange={(e) =>
                          setSecuritySettings({
                            ...securitySettings,
                            loginAttempts: parseInt(e.target.value),
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lockoutDuration">
                        Lockout Duration (minutes)
                      </Label>
                      <Input
                        id="lockoutDuration"
                        type="number"
                        min="1"
                        max="1440"
                        value={securitySettings.lockoutDuration}
                        onChange={(e) =>
                          setSecuritySettings({
                            ...securitySettings,
                            lockoutDuration: parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="ipRestriction">IP Restriction</Label>
                      <p className="text-sm text-muted-foreground">
                        Restrict access to specific IP addresses
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
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Password Requirements</h4>

                  <div className="space-y-2">
                    <Label htmlFor="minPasswordLength">
                      Minimum Password Length
                    </Label>
                    <Input
                      id="minPasswordLength"
                      type="number"
                      min="6"
                      max="128"
                      value={securitySettings.minPasswordLength}
                      onChange={(e) =>
                        setSecuritySettings({
                          ...securitySettings,
                          minPasswordLength: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="requireSpecialChars">
                          Special Characters
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Require special characters
                        </p>
                      </div>
                      <Switch
                        id="requireSpecialChars"
                        checked={securitySettings.requireSpecialChars}
                        onCheckedChange={(checked) =>
                          setSecuritySettings({
                            ...securitySettings,
                            requireSpecialChars: checked,
                          })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="requireNumbers">Numbers</Label>
                        <p className="text-sm text-muted-foreground">
                          Require numbers
                        </p>
                      </div>
                      <Switch
                        id="requireNumbers"
                        checked={securitySettings.requireNumbers}
                        onCheckedChange={(checked) =>
                          setSecuritySettings({
                            ...securitySettings,
                            requireNumbers: checked,
                          })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="requireUppercase">Uppercase</Label>
                        <p className="text-sm text-muted-foreground">
                          Require uppercase letters
                        </p>
                      </div>
                      <Switch
                        id="requireUppercase"
                        checked={securitySettings.requireUppercase}
                        onCheckedChange={(checked) =>
                          setSecuritySettings({
                            ...securitySettings,
                            requireUppercase: checked,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={loading.security}>
                  {loading.security ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
