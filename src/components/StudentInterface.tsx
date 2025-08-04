import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Radio, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Users,
  Bell,
  Smartphone,
  Activity,
  Calendar,
  TrendingUp
} from "lucide-react";

interface StudentInterfaceProps {
  onLogout: () => void;
}

export const StudentInterface = ({ onLogout }: StudentInterfaceProps) => {
  const [isListening, setIsListening] = useState(false);
  const [locationVerified, setLocationVerified] = useState(true);
  const [timeWindowActive, setTimeWindowActive] = useState(true);
  const [signalReady, setSignalReady] = useState(true);

  // Mock device info (in real app, this would be hashed)
  const deviceInfo = {
    id: "abc123def456",
    type: "Mobile",
    lastSeen: "2024-01-15 10:30 AM"
  };

  // Mock attendance data
  const attendanceStats = [
    { subject: "Computer Science", percentage: 85, total: 20, present: 17 },
    { subject: "Mathematics", percentage: 92, total: 18, present: 16 },
    { subject: "Physics", percentage: 78, total: 22, present: 17 },
  ];

  const handleStartListening = () => {
    setIsListening(true);
    // Simulate listening for ultrasonic signal
    setTimeout(() => {
      setIsListening(false);
      // Show success toast or navigate to confirmation
      console.log("Attendance marked successfully!");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-primary/5">
      {/* Header */}
      <header className="bg-card border-b shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-primary to-primary-glow rounded-lg">
                <Radio className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">EchoMark</h1>
                <Badge variant="secondary" className="text-xs">Student</Badge>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <Button variant="outline" onClick={onLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Join Attendance Session */}
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Join Attendance Session</CardTitle>
            <CardDescription>
              Click the button below to start listening for attendance signals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-8">
              <div className="inline-flex p-6 bg-primary/10 rounded-full mb-4">
                <Radio className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Ready to Listen</h3>
            </div>

            {/* Status Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className={`p-4 rounded-lg border-2 ${locationVerified ? 'bg-success/10 border-success/20' : 'bg-destructive/10 border-destructive/20'}`}>
                <div className="flex items-center gap-3">
                  <CheckCircle className={`h-5 w-5 ${locationVerified ? 'text-success' : 'text-destructive'}`} />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">
                      {locationVerified ? "Verified ✓" : "Not in range"}
                    </p>
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-lg border-2 ${timeWindowActive ? 'bg-primary/10 border-primary/20' : 'bg-muted/50 border-border'}`}>
                <div className="flex items-center gap-3">
                  <Clock className={`h-5 w-5 ${timeWindowActive ? 'text-primary' : 'text-muted-foreground'}`} />
                  <div>
                    <p className="font-medium">Time Window</p>
                    <p className="text-sm text-muted-foreground">
                      {timeWindowActive ? "Active Sessions" : "No active sessions"}
                    </p>
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-lg border-2 ${signalReady ? 'bg-success/10 border-success/20' : 'bg-muted/50 border-border'}`}>
                <div className="flex items-center gap-3">
                  <Activity className={`h-5 w-5 ${signalReady ? 'text-success' : 'text-muted-foreground'}`} />
                  <div>
                    <p className="font-medium">Signal</p>
                    <p className="text-sm text-muted-foreground">
                      {signalReady ? "Ready" : "Not ready"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Listen Button */}
            <div className="text-center">
              <Button
                variant={isListening ? "listening" : "hero"}
                size="lg"
                className="px-8 py-6 text-lg"
                onClick={handleStartListening}
                disabled={!locationVerified || !timeWindowActive || !signalReady || isListening}
              >
                <MapPin className="h-5 w-5" />
                {isListening ? "Listening..." : "Start Listening"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* My Attendance Statistics */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              My Attendance Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {attendanceStats.map((stat) => (
                <div key={stat.subject} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">{stat.subject}</h4>
                    <span className="text-sm text-muted-foreground">
                      {stat.present}/{stat.total} sessions
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={stat.percentage} className="flex-1" />
                    <span className="font-semibold text-sm w-12">{stat.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Device Information */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              Device Information
            </CardTitle>
            <CardDescription>
              Secure device identification for attendance verification
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Device ID (Hashed)</Label>
                  <p className="font-mono text-sm">{deviceInfo.id}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Device Type</Label>
                  <p className="text-sm">{deviceInfo.type}</p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Last Activity</Label>
                <p className="text-sm">{deviceInfo.lastSeen}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Today's Status */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today's Attendance Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg border border-success/20">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="font-medium">Computer Science - CS301A</span>
                </div>
                <Badge variant="secondary" className="bg-success/20 text-success">Present</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg border border-warning/20">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-warning" />
                  <span className="font-medium">Mathematics - MATH201</span>
                </div>
                <Badge variant="secondary" className="bg-warning/20 text-warning">Pending</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const Label = ({ className, children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label className={`text-sm font-medium ${className}`} {...props}>
    {children}
  </label>
);